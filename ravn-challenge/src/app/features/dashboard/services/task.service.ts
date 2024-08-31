import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apolloURL } from '../../../graphql.config';
import { Apollo, ResultOf, TypedDocumentNode } from 'apollo-angular';
import { GET_TASK } from '../../../core/store/queries/tasks-queries';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apollo: Apollo) { }



  getTasks(filters: any) {

    return this.apollo.query({
      query: GET_TASK,
      variables: filters,
    });
  }

}
