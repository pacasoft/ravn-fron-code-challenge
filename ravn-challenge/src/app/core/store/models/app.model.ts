import { initialUser, User } from "./usuario.models";

export interface AppSate {
    profile: User;
    loading: boolean;
    route: string;
}

export const initialAppState: AppSate = {
    profile: initialUser,
    loading: true,
    route: ''
};