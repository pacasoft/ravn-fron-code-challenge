import { initialUser, User } from "./usuario.models";

export interface AppSate {
    profile: User;
    loading: boolean;
    sidebarOpen: boolean;
    route: string;
    smallScreen: boolean;
}

export const initialAppState: AppSate = {
    profile: initialUser,
    loading: true,
    route: '',
    sidebarOpen: false,
    smallScreen: false,
};