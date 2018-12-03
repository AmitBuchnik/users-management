import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpRequest, HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import * as PostsActions from './posts.actions';
import * as fromApp from '../../store/app.reducers';
import { IPost } from "../post.model";

@Injectable()
export class TasksEffects {
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.IAppState>) {
    }

    @Effect()
    tasksFetch = this.actions$
        .ofType(PostsActions.FETCH_POSTS)
        .pipe(switchMap((action: PostsActions.FetchPosts) => {
            return this.httpClient.get<IPost[]>('https://users-management-2e2ec.firebaseio.com//posts.json');
        }),
            map((tasks) => {
                return {
                    type: PostsActions.SET_POSTS,
                    payload: tasks
                };
            }));

    @Effect({ dispatch: false })
    tasksStore = this.actions$
        .ofType(PostsActions.STORE_POSTS)
        .pipe(withLatestFrom(this.store.select('posts')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://users-management-2e2ec.firebaseio.com//posts.json', state.posts);
                return this.httpClient.request(request);
            }));
}




