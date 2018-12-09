import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { take, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IPost } from './post.model';

import * as fromApp from '../store/app.reducers';
import * as fromUsers from '../users/store/user.reducers';
import * as fromPosts from '../posts/store/posts.reducers';
import * as UserActions from '../users/store/user.actions';
import * as PostsActions from './store/posts.actions';

@Injectable({
    providedIn: 'root'
})
export class PostsResolver implements Resolve<Observable<IPost[]>> {
    constructor(private store: Store<fromUsers.IFeatureState>) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<IPost[]> {
        this.store.dispatch(new UserActions.FetchUsers());
        this.store.dispatch(new PostsActions.FetchPosts());

        const usersState$ = this.store.select(fromApp.getUsersState)
            .pipe(filter((usersState: fromUsers.IState) => usersState && usersState.loaded));

        const postsState$ = this.store.select('posts')
            .pipe(filter((postsState: fromPosts.IState) => postsState && postsState.loaded));

        // const usersState$ = this.store.select(fromApp.getUsersState)
        //     .pipe(debounceTime(1500)
        //         , distinctUntilChanged());

        // const postsState$ = this.store.select('posts')
        //     .pipe(debounceTime(1500)
        //         , distinctUntilChanged());

        const combined = combineLatest(usersState$, postsState$);

        return combined.pipe(map(([usersState, postsState]) => {
            postsState.posts.forEach(p => {
                const user = usersState.users.find(u => u.id === p.userId);
                if (user) {
                    p.UserName = user.name;
                }
                return p;
            });
            return postsState.posts;
        })
            , take(1));
    }
}




