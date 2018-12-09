import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { HttpRequest, HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom, filter, catchError } from "rxjs/operators";

import * as PostsActions from './posts.actions';
import * as fromApp from '../../store/app.reducers';
import { IPost } from "../post.model";
import { empty, of } from "rxjs";

@Injectable()
export class PostsEffects {
    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.IAppState>) {
    }

    @Effect()
    postsFetch = this.actions$
        .ofType(PostsActions.FETCH_POSTS)
        .pipe(withLatestFrom(this.store.select('posts'))
            , switchMap(([action, state]) => {
                if (state.loaded) {
                    return empty();
                }

                return this.http.get<IPost[]>('https://users-management-2e2ec.firebaseio.com//posts.json')
                    .pipe(switchMap(posts => {
                        if (!posts || posts.length === 0) {
                            return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
                        }
                        return of(posts);
                    }),
                        filter(posts => posts != null),
                        map((posts) => {
                            return {
                                type: PostsActions.SET_POSTS,
                                payload: posts
                            };
                        }),
                        catchError((error: Error) => {
                            console.log(error);
                            return of({
                                type: PostsActions.FAILED_LOAD_POSTS,
                                payload: error.message
                            });
                        }));
            }));

    // @Effect()
    // postsFetch = this.actions$
    //     .pipe(ofType(PostsActions.FETCH_POSTS)
    //         , withLatestFrom(this.store.select('posts'))
    //         , switchMap(([action, state]) => {
    //             if (state.loaded) {
    //                 return empty();
    //             }

    //             return this.http.get<IPost[]>('https://users-management-2e2ec.firebaseio.com//posts.json')
    //                 .pipe(filter(posts => posts != null),
    //                     map((posts) => {
    //                         return {
    //                             type: PostsActions.SET_POSTS,
    //                             payload: posts
    //                         };
    //                     }),
    //                     catchError((error: Error) => {
    //                         console.log(error);
    //                         return of({
    //                             type: PostsActions.FAILED_LOAD_POSTS,
    //                             payload: error.message
    //                         });
    //                     }));
    //         }));

    @Effect({ dispatch: false })
    postsStore = this.actions$
        .ofType(PostsActions.STORE_POSTS)
        .pipe(withLatestFrom(this.store.select('posts')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://users-management-2e2ec.firebaseio.com//posts.json', state.posts);
                return this.http.request(request);
            }));
}




