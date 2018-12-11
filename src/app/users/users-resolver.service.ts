import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IUser } from './user.model';

import * as fromApp from '../store/app.reducers';
import * as fromUsers from './store/user.reducers';
import * as UserActions from './store/user.actions';
import * as PostsActions from '../posts/store/posts.actions';
import * as TasksActions from '../tasks/store/tasks.actions';

@Injectable({
    providedIn: 'root'
})
export class UsersResolver implements Resolve<Observable<IUser[]>> {
    constructor(private store: Store<fromUsers.IFeatureState>) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<IUser[]> {
        this.store.dispatch(new UserActions.FetchUsers());
        this.store.dispatch(new PostsActions.FetchPosts());
        this.store.dispatch(new TasksActions.FetchTasks());

        // return this.store.select(fromApp.getUsersState)
        //     .pipe(debounceTime(1500)
        //         , distinctUntilChanged()
        //         , map((usersState: fromUsers.IState) => usersState.users)
        //         , take(1));

        return this.store.select(fromApp.getUsersState)
            .pipe(filter((usersState: fromUsers.IState) => usersState.loaded)
                , map((usersState: fromUsers.IState) => usersState.users)
                , take(1));
    }
}




