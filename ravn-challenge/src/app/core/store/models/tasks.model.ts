import { User } from "./usuario.models";

export enum Tag {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    NODE_JS = 'NODE_JS',
    RAILS = 'RAILS',
    REACT = 'REACT'
}

export enum Status {
    BACKLOG = 'BACKLOG',
    CANCELLED = 'CANCELLED',
    DONE = 'DONE',
    IN_PROGRESS = 'IN_PROGRESS',
    TODO = 'TODO'
}

export enum PointEstimate {
    ZERO = 'ZERO',
    ONE = 'ONE',
    TWO = 'TWO',
    FOUR = 'FOUR',
    EIGHT = 'EIGHT'
}

export interface Task {
    id: string;
    name: string;
    pointEstimate: PointEstimate;
    creator: User;
    dueDate: Date;
    position: number;
    status: Status;
    tags: Tag[];
    createdAt: Date;
    assignee: User;
    moving: boolean;
};

export const initialTask: Task = {
    id: "1",
    name: 'Task 1',
    pointEstimate: PointEstimate.EIGHT,
    creator: {
        id: 1,
        fullName: 'User 1',
        email: '',
        type: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: ''
    },
    dueDate: new Date(),
    position: 1,
    status: Status.TODO,
    tags: [Tag.ANDROID],
    createdAt: new Date(),
    moving: false,

    assignee: {
        id: 1,
        fullName: 'User 1',
        email: '',
        type: 'CANDIDATE',
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: ''
    },
};

export interface IFilterList {
    assigneeId: string | null
    assigneeAvatar: string | null
    assigneeName: string | null
    dueDate: Date | null
    name: string | null
    ownerId: string
    ownerAvatar: string | null
    ownerName: string | null
    pointEstimate: PointEstimate | null
    status: Status | null
    tags: Tag[]
}

export interface TaskList {
    tasks: Task[];
    loading: boolean;
    error: { message: string } | null;
    filters: IFilterList;
};

export const initialTaskList: TaskList = {
    tasks: [],
    loading: true,
    error: null,
    filters: {
        name: '',
        assigneeId: null,
        assigneeAvatar: null,
        assigneeName: null,
        dueDate: null,
        ownerId: '',
        ownerAvatar: null,
        ownerName: null,
        status: null,
        pointEstimate: null,
        tags: [],
    }
};