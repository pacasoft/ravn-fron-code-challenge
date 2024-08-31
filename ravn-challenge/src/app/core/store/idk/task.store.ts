import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, forkJoin, map, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from '@ngrx/operators';
import { initialTaskList, PointEstimate, Status, Tag, Task, TaskList } from "../models/tasks.model";
import { TaskService } from "../../../features/dashboard/services/task.service";
import { CREATE_TASK, DELETE_TASK, GET_TASK, UPDATE_TASK } from "../queries/tasks-queries";
import { Apollo, gql } from "apollo-angular";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../models/usuario.models";


export const TaskListStore = signalStore(
    { providedIn: 'root' },
    withState(initialTaskList),
    withComputed((state) => ({
        getTasksCompleted: computed(() => {

            return state.tasks().filter(task => task.status === Status.DONE).sort((a, b) => a.position - b.position);
        }),
        getTasksInProgress: computed(() => {

            return state.tasks().filter(task => task.status === Status.IN_PROGRESS);
        }),
        getTasksToDo: computed(() => {

            return state.tasks().filter(task => task.status === Status.TODO);
        }),
        getTasksCancelled: computed(() => {
            return state.tasks().filter(task => task.status === Status.CANCELLED);
        }),
        getTasksBacklog: computed(() => {
            return state.tasks().filter(task => task.status === Status.BACKLOG);
        }),


        getNumberTasksCompleted: computed(() => {
            return state.tasks().filter(task => task.status === Status.DONE).length;
        }),
        getNumberTasksInProgress: computed(() => {
            return state.tasks().filter(task => task.status === Status.IN_PROGRESS).length;
        }),
        getNumberTasksToDo: computed(() => {
            return state.tasks().filter(task => task.status === Status.TODO).length;
        }),
        getNumberTasksCancelled: computed(() => {
            return state.tasks().filter(task => task.status === Status.CANCELLED).length;
        }),
        getNumberTasksBacklog: computed(() => {
            return state.tasks().filter(task => task.status === Status.BACKLOG).length;
        }),

        createTaskObject: computed(() => {
            const task: any = {};

            if (state.filters.name())
                task.name = state.filters.name();

            if (state.filters.assigneeId())
                task.assigneeId = state.filters.assigneeId();

            if (state.filters.dueDate())
                task.dueDate = state.filters.dueDate();

            if (state.filters.ownerId())
                task.ownerId = state.filters.ownerId();

            if (state.filters.status())
                task.status = state.filters.status();

            if (state.filters.tags().length)
                task.tags = state.filters.tags();

            if (state.filters.pointEstimate())
                task.pointEstimate = state.filters.pointEstimate();

            return { input: task };
        }),

        tagList: computed(() => {
            // mark each tag as checked if found in data.tags
            // console.log(this.data.tags);
            // console.log(this.tagList);
            let tagList = [
                { name: Tag.ANDROID, checked: false },
                { name: Tag.IOS, checked: false },
                { name: Tag.NODE_JS, checked: false },
                { name: Tag.RAILS, checked: false },
                { name: Tag.REACT, checked: false }
            ]

            tagList = tagList.map(tag => {
                return {
                    ...tag,
                    checked: state.filters.tags().includes(tag.name)
                };
            });

            return tagList;
        }),

        filtersCount: computed(() => {
            let count = 0;
            if (state.filters.name()) count++;
            if (state.filters.assigneeId()) count++;
            if (state.filters.dueDate()) count++;
            if (state.filters.ownerId()) count++;
            if (state.filters.status()) count++;
            if (state.filters.tags().length > 0) count++;
            if (state.filters.pointEstimate()) count++;

            return count;
        }),

        getNumberNotifications: computed(() => {
            // return tasks that are due today
            return state.tasks().filter(task => {
                let date = new Date(task.dueDate);
                return date.getDate() === new Date().getDate();
            }).length;
        }),

    })),
    withMethods((state, taskService = inject(TaskService), _snackBar = inject(MatSnackBar)) => ({
        loadAllTasks: rxMethod<void>(
            pipe(
                debounceTime(450),
                tap(() => patchState(state, { loading: true })),

                switchMap(data => {
                    return taskService.getTasks(state.createTaskObject()).pipe(
                        tapResponse({
                            next: (response) => {
                                let tasks = ((response.data!) as TaskList).tasks.map((task: Task) => ({ ...task, moving: false }));
                                patchState(state, { tasks: tasks });
                            },
                            error: (err: any) => {
                                patchState(state, { loading: false });

                                console.table("cause", err.cause.error.errors);
                                const msg = err.cause.error.errors[0].message;

                                _snackBar.open(msg, 'Close', {
                                    duration: 5000,
                                });

                                console.error(err);
                            },
                            finalize: () => patchState(state, { loading: false })
                        })
                    );
                }),
            )
        ),

        getTask(id: string) {
            return state.tasks().find(task => task.id === id);
        },

        clearFilters() {
            let filters = initialTaskList.filters;
            filters.tags = [];
            patchState(state, { filters: filters });
        },

        setNameFilter(name: string) {
            let filters: any = { ...state.filters() };
            filters.name = name;
            patchState(state, { filters: filters });
        },

        setStatusFilter(status: Status) {
            let filters: any = { ...state.filters() };
            filters.status = status;
            patchState(state, { filters: filters });
        },

        setAssigneeFilter(assignee: User | null) {
            let filters: any = { ...state.filters() };
            if (assignee) {
                filters.assigneeId = assignee.id;
                filters.assigneeAvatar = assignee.avatar;
                filters.assigneeName = assignee.fullName;
            } else {
                filters.assigneeId = null;
                filters.assigneeAvatar = null;
                filters.assigneeName = null;
            }
            patchState(state, { filters: filters });
        },

        setDueDateFilter(dueDate: Date | null) {
            let filters: any = { ...state.filters() };
            filters.dueDate = dueDate;
            patchState(state, { filters: filters });
        },

        setPointEstimateFilter(pointEstimate: PointEstimate) {
            let filters: any = { ...state.filters() };
            filters.pointEstimate = pointEstimate;
            patchState(state, { filters: filters });
        },

        setTagsFilter(tag: { name: Tag, checked: boolean }) {
            let currentList = state.filters.tags();

            if (currentList.includes(tag.name)) {
                currentList = currentList.filter((_tag) => _tag !== tag.name);
            } else {
                currentList.push(tag.name);
            }

            let filters: any = { ...state.filters() };

            filters.tags = currentList;

            patchState(state, { filters: filters });
        },

        setOwnerFilter(user: User | null) {
            let filters: any = { ...state.filters() };
            if (user) {
                filters.ownerId = user.id;
                filters.ownerAvatar = user.avatar;
                filters.ownerName = user.fullName;
            } else {
                filters.ownerId = '';
                filters.ownerAvatar = null;
                filters.ownerName = null;
            }
            patchState(state, { filters: filters });
        },

    })),



    withMethods((state, apollo = inject(Apollo)) => ({
        deleteTask(id: string) {
            patchState(state, { loading: true });
            apollo.mutate({
                mutation: DELETE_TASK,
                variables: {
                    input: { id: id },
                },
                update: (cache) => {
                    let tasks: any = cache.readQuery({ query: GET_TASK, variables: state.createTaskObject() });

                    tasks = tasks.tasks.filter((task: Task) => task.id !== id);

                    cache.writeQuery({ query: GET_TASK, variables: state.createTaskObject(), data: { tasks } });

                    patchState(state, { tasks: tasks });
                },
                optimisticResponse: (vars, { IGNORE }) => {
                    return {
                        deleteTask: {
                            id: id,
                            __typename: "Task"
                        }
                    }
                },

            }).subscribe(({ data, errors, loading }) => {
                if (errors) {
                    // console.error('[DeletingTasks] Error deleting task', errors);
                    // alert(`Error deleting task: ${errors[0].message}`);
                }
                if (data) {
                    // console.log('[DeletingTasks] Task Deleted', JSON.stringify(data, null, 2));
                    // state.loadAllTasks();
                }
            });
            patchState(state, { loading: false });

        },




        updateTask(task: Task) {
            patchState(state, { loading: true });
            let mutationQuery = UPDATE_TASK;
            let taskInput: any = {
                id: task.id ? task.id : null,
                assigneeId: task.assignee?.id.toString(),
                dueDate: task.dueDate,
                name: task.name,
                pointEstimate: task.pointEstimate,
                position: task.position,
                status: task.status,
                tags: task.tags
            };
            if (!task.id) {
                mutationQuery = CREATE_TASK;
                taskInput = {
                    assigneeId: task.assignee?.id.toString(),
                    dueDate: task.dueDate,
                    name: task.name,
                    pointEstimate: task.pointEstimate,
                    status: task.status,
                    tags: task.tags
                }
            }

            apollo.mutate({
                mutation: mutationQuery,
                variables: {
                    input: taskInput,
                },
                update: (cache, result: any) => {

                    if (mutationQuery === CREATE_TASK) {
                        let tasks: any = cache.readQuery({ query: GET_TASK, variables: state.createTaskObject() });

                        let data = result.data.createTask;

                        tasks = [...tasks.tasks, data];

                        cache.writeQuery({ query: GET_TASK, variables: state.createTaskObject(), data: { tasks } });
                        patchState(state, { tasks });
                    } else { // Update task
                        let data = result.data.updateTask;
                        let tasks: any = cache.readQuery({ query: GET_TASK, variables: state.createTaskObject() });

                        const updatedTasks: any = tasks.tasks.map((task: Task) => {
                            if (task.id === data.id) {
                                return data;
                            }
                            return task;
                        });
                        //sort tasks by position
                        updatedTasks.sort((a: Task, b: Task) => a.position - b.position);
                        patchState(state, { tasks: updatedTasks });
                        cache.writeQuery({ query: GET_TASK, variables: state.createTaskObject(), data: { tasks: updatedTasks } });
                    }

                },
                optimisticResponse: (vars, { IGNORE }) => {
                    if (!task.id) {
                        return {
                            createTask: {
                                __typename: "Task",
                                id: "temp-id",
                                name: task.name,
                                pointEstimate: task.pointEstimate,

                                dueDate: task.dueDate,
                                position: task.position,
                                status: task.status,
                                tags: task.tags,
                                createdAt: task.createdAt,
                                creator: {
                                    id: task.creator.id,
                                    avatar: task.creator.avatar,
                                    email: task.creator.email,
                                    fullName: task.creator.fullName,
                                    type: task.creator.type,
                                    __typename: "User"
                                },
                                assignee: {
                                    id: task.creator.id,
                                    avatar: task.creator.avatar,
                                    email: task.creator.email,
                                    fullName: task.creator.fullName,
                                    type: task.creator.type,
                                    __typename: "User"
                                }

                            }
                        }
                    }
                    return {
                        updateTask: {
                            __typename: "Task",
                            id: task.id,
                            name: task.name,
                            pointEstimate: task.pointEstimate,

                            dueDate: task.dueDate,
                            position: task.position,
                            status: task.status,
                            tags: task.tags,
                            createdAt: task.createdAt,
                            creator: {
                                id: task.creator.id,
                                avatar: task.creator.avatar,
                                email: task.creator.email,
                                fullName: task.creator.fullName,
                                type: task.creator.type,
                                __typename: "User"
                            },
                            assignee: {
                                id: task.creator.id,
                                avatar: task.creator.avatar,
                                email: task.creator.email,
                                fullName: task.creator.fullName,
                                type: task.creator.type,
                                __typename: "User"
                            }

                        }
                    }
                },

            }).subscribe(({ data, errors, loading }) => {
                if (errors) {
                    // console.error('[UpdatingTasks] Error updating task', errors);
                    // alert(`Error updating task: ${errors[0].message}`);
                }
                if (data) {
                    // console.log('[UpdatingTasks] Task Updated', JSON.stringify(data, null, 2));
                    // state.loadAllTasks();
                }
            });
            patchState(state, { loading: false });
        }
    })),




)