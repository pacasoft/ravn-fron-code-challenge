export interface IDashState {
    taskView: 'LIST' | 'GRID';
}

export const initialDashState: IDashState = {
    taskView: 'GRID'
};
