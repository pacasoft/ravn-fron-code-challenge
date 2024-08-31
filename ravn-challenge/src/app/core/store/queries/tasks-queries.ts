import { gql } from "apollo-angular";
import { Status, Tag } from "../models/tasks.model";

const COMMON_GET_TASK = `
            id
            name
            pointEstimate
            creator {
                id
                avatar
                email
                fullName
                type
            }
            dueDate
            position
            status
            tags 
            createdAt

            assignee {
                id
                avatar
                email
                fullName
                type
            }
`;

const GET_TASK = gql`
    query tasks($input: FilterTaskInput!){
        tasks(input: $input) {
            ${COMMON_GET_TASK}
        }
    }
`

function getTasksQuery(status: Status) {
    return gql`
        query {
            tasks(input: { status: ${status} }) {
                ${COMMON_GET_TASK}
            }
        }
    `;
}

const UPDATE_TASK = gql`
    mutation updateTask($input: UpdateTaskInput!) {
        updateTask(input: $input) {
            ${COMMON_GET_TASK}
        }
    }
`;
const CREATE_TASK = gql`
    mutation createTask($input: CreateTaskInput!) {
        createTask(input: $input) {
            ${COMMON_GET_TASK}
        }
    }
`;

const DELETE_TASK = gql`
    mutation deleteTask($input: DeleteTaskInput!) {
        deleteTask(input: $input) {
            id
        }
    }
`;


const TASK_FRAGMENT = gql`
fragment NewTask on Task {
    ${COMMON_GET_TASK}
}
`

const GET_TODO_TASKS = getTasksQuery(Status.TODO);
const GET_DONE_TASKS = getTasksQuery(Status.DONE);
const GET_IN_PROGRESS_TASKS = getTasksQuery(Status.IN_PROGRESS);
const GET_BACKLOG_TASKS = getTasksQuery(Status.BACKLOG);
const GET_CANCELLED_TASKS = getTasksQuery(Status.CANCELLED);

export {
    GET_TASK,
    GET_DONE_TASKS,
    GET_IN_PROGRESS_TASKS,
    GET_TODO_TASKS,
    GET_BACKLOG_TASKS,
    GET_CANCELLED_TASKS,

    UPDATE_TASK,
    CREATE_TASK,
    DELETE_TASK,
    TASK_FRAGMENT
};