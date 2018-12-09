import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromPosts from '../posts/store/posts.reducers';
import * as fromTasks from '../tasks/store/tasks.reducers';
import * as fromUsers from '../users/store/user.reducers';

export interface IAppState {
    auth: fromAuth.IState;
    posts: fromPosts.IState;
    tasks: fromTasks.IState;
}

export const reducers: ActionReducerMap<IAppState> = {
    auth: fromAuth.authReducer,
    posts: fromPosts.postsReducer,
    tasks: fromTasks.tasksReducer
};

export const getUsersState = createFeatureSelector<fromUsers.IState>('users');

export const getUsers = (state: fromUsers.IState) => state.users;

export const getUserNameById = (id) => createSelector(
    getUsers, users => users.find(u => u.id === id)
);

