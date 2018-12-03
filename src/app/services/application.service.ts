import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from "rxjs/operators";
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromUsers from '../users/store/user.reducers';
import * as fromPosts from '../posts/store/posts.reducers';
import * as fromTasks from '../tasks/store/tasks.reducers';
import * as UserActions from '../users/store/user.actions';

import { IUser } from '../users/user.model';
import { IPost } from '../posts/post.model';
import { ITask } from '../tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient, private store: Store<fromApp.IAppState>) {
  }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(switchMap(users => {
          fromUsers.intialState.users = users;
          return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
        }), switchMap(posts => {
          fromPosts.intialState.posts = posts;
          return this.http.get<ITask[]>('https://jsonplaceholder.typicode.com/todos')
        }))
        .toPromise()
        .then(tasks => {
          fromTasks.intialState.tasks = tasks;
          resolve();
        })
        .catch(this.handleError);
    });
  }

  private handleError(data?: any) {
    return (error: any) => {
      console.log(error);
    };
  }
}