import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as UserActions from '../../users/store/user.actions';
import * as PostsActions from '../../posts/store/posts.actions';
import * as TasksActions from '../../tasks/store/tasks.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.IState>;

  constructor(private store: Store<fromApp.IAppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData() {
    this.store.dispatch(new UserActions.StoreUsers());
    this.store.dispatch(new PostsActions.StorePosts());
    this.store.dispatch(new TasksActions.StoreTasks());
  }

  onFetchData() {
    this.store.dispatch(new UserActions.FetchUsers());
    this.store.dispatch(new PostsActions.FetchPosts());
    this.store.dispatch(new TasksActions.FetchTasks());
  }
}
