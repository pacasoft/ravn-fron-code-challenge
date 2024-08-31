import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialDashState } from "../models/dash-filters.model";

export const DashboardStore = signalStore(
    { providedIn: 'root' },
    withState(initialDashState),
    withMethods((state) => ({
        updateTaskView: (taskView: 'LIST' | 'GRID') => {
            patchState(state, { taskView });
        }
    })),

    withComputed((state) => ({
    })),

)