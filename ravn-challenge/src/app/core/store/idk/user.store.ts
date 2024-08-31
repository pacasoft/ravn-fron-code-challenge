import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { UsuarioService } from "../../../features/dashboard/services/usuario.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, pipe, switchMap, tap } from "rxjs";
import { initialUserList, UserList } from "../models/usuario.models";

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialUserList),
    withMethods((state, usuarioService = inject(UsuarioService)) => ({
        loadUsers: rxMethod<void>(
            pipe(
                debounceTime(500),
                tap(() => patchState(state, { loading: true })),

                switchMap(data => {
                    return usuarioService.getUsers().pipe(
                        tapResponse({
                            next: (response) => {
                                patchState(state, (response.data) as UserList);
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
    })),

    withComputed((state) => ({
    })),

)