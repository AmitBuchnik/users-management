import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpRequest, HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, take, switchMap, withLatestFrom, filter, catchError } from "rxjs/operators";
import { of, empty, throwError } from "rxjs";

import { IUser } from "../user.model";

import * as fromApp from '../../store/app.reducers';
import * as fromUser from './user.reducers';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromUser.IFeatureState>) {
    }

    // @Effect()
    // usersFetch = this.actions$
    //     .ofType(UserActions.FETCH_USERS)
    //     .pipe(withLatestFrom(this.store.select(fromApp.getUsersState))
    //         , switchMap(([action, state]) => {
    //             if (state.loaded) {
    //                 return empty();
    //             }

    //             return this.http.get<IUser[]>('https://users-management-2e2ec.firebaseio.com//users.json')
    //                 .pipe(filter(users => users != null),
    //                     map((users) => {
    //                         return {
    //                             type: UserActions.SET_USERS,
    //                             payload: users
    //                         };
    //                     }),
    //                     catchError((error: Error) => {
    //                         console.log(error);
    //                         return of({
    //                             type: UserActions.FAILED_LOAD_USERS,
    //                             payload: error.message
    //                         });
    //                     }));
    //         }));

    @Effect()
    usersFetch = this.actions$
        .ofType(UserActions.FETCH_USERS)
        .pipe(withLatestFrom(this.store.select(fromApp.getUsersState))
            , switchMap(([action, state]) => {
                if (state.loaded) {
                    return empty();
                }

                return this.http.get<IUser[]>('https://users-management-2e2ec.firebaseio.com//users.json')
                    .pipe(switchMap(users => {
                        if (!users || users.length === 0) {
                            return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
                        }
                        return of(users);
                    }),
                        filter(users => users != null),
                        map((users) => {
                            return {
                                type: UserActions.SET_USERS,
                                payload: users
                            };
                        }),
                        catchError((error: Error) => {
                            console.log(error);
                            return of({
                                type: UserActions.FAILED_LOAD_USERS,
                                payload: error.message
                            });
                        }));
            }));

    @Effect({ dispatch: false })
    usersStore = this.actions$
        .ofType(UserActions.STORE_USERS)
        .pipe(withLatestFrom(this.store.select(fromApp.getUsersState)),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://users-management-2e2ec.firebaseio.com//users.json', state.users);
                return this.http.request(request)
                    .pipe(catchError((error: Error) => {
                        console.log(error);
                        return of(error);
                    }));
            }));

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}








