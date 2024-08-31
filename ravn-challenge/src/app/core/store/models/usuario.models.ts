export interface User {
    id: number;
    fullName: string;
    email: string | null;
    type: 'ADMIN' | 'CANDIDATE';
    createdAt: Date;
    updatedAt: Date;
    avatar: string;
};

export const initialUser: User = {
    id: 1,
    fullName: 'User 1',
    email: '',
    type: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: ''
}

export interface UserData {
    profile: User;
    loading: boolean;
};

export const initialUserData: UserData = {
    profile: initialUser,
    loading: false
};


export interface UserList {
    users: User[];
    loading: boolean;
};

export const initialUserList: UserList = {
    users: [initialUser],
    loading: false
};