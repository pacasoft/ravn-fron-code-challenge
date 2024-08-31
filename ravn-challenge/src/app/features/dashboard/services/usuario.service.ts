import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PROFILE, GET_USERS } from '../../../core/store/queries/usuario.queries';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private apollo: Apollo) { }

  getProfile() {
    return this.apollo.query({
      query: GET_PROFILE
    });
  }

  getUsers() {
    return this.apollo.query({
      query: GET_USERS
    });
  }
}
