import { tapResponse } from '@ngrx/operators';
import { getState, patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { computed, inject } from "@angular/core";
import { UsuarioService } from "../../../features/dashboard/services/usuario.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, pipe, switchMap, tap } from "rxjs";
import { initialUserData, UserData, UserList } from "../models/usuario.models";
import { initialAppState } from '../models/app.model';
import { TaskListStore } from './task.store';

export const AppState = signalStore(
    { providedIn: 'root' },
    withState(initialAppState),
    withMethods((state, usuarioService = inject(UsuarioService)) => ({
        loadProfile: rxMethod<void>(
            pipe(
                debounceTime(500),
                tap(() => patchState(state, { loading: true })),

                switchMap(data => {
                    return usuarioService.getProfile().pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(state, (response.data) as UserData);
                            },
                            error: (err) => {
                                patchState(state, { loading: false });
                                console.error(err);
                            },
                            finalize: () => patchState(state, { loading: false })
                        })
                    );
                }),
            )
        ),

        setRoute: (route: string) => {
            patchState(state, { route });
        },


        setSidebarStatus(status: boolean) {
            patchState(state, { sidebarOpen: status });
        },
        toggleSidebar() {
            patchState(state, { sidebarOpen: !state.sidebarOpen });
        },

        setScreenSize: (smallScreen: boolean) => {
            patchState(state, { smallScreen });
            if (smallScreen) {
                patchState(state, { sidebarOpen: false });
            } else {
                patchState(state, { sidebarOpen: true });
            }
        },


        login() {
        }

    })),

    withComputed((state, taskStore = inject(TaskListStore)) => ({
        getProfileTasks: computed(() => {
            let currentTaskStore = getState(taskStore);
            return currentTaskStore.tasks.filter(task => task.assignee?.id === state.profile?.id());
        }),
    })),

)