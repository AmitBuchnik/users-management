import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Router } from "@angular/router";
import { map, switchMap, mergeMap, tap, catchError } from 'rxjs/operators';
import { from, throwError, of } from 'rxjs';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private router: Router) {
    }

    // after the TRY_SIGNUP effect dispatch SIGNIN and SET_TOKEN
    @Effect({ dispatch: true })
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .pipe(map((action: AuthActions.TrySignup) => {
            return action.payload;
        }),
            // unlike map switchMap is not wrapping the return value with observable but switches to return another observable
            switchMap((authData: { username: string, password: string }) => {
                // from promise to observable
                return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
                    .pipe(switchMap(() => {
                        // from promise to observable
                        return from(firebase.auth().currentUser.getIdToken());
                    }),
                        // mergeMap allows for multiple inner subscriptions to be active in the same time
                        mergeMap((token: string) => {
                            this.router.navigate(['/']);

                            return [
                                {
                                    type: AuthActions.SIGNUP
                                },
                                {
                                    type: AuthActions.SET_TOKEN,
                                    payload: token
                                }
                            ];
                        }),
                        catchError((error: Error) => {
                            console.log(error);
                            return of({
                                type: AuthActions.AUTH_ERROR,
                                payload: error
                            });
                        }));
            }));

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .pipe(map((action: AuthActions.TrySignin) => {
            return action.payload;
        }),
            // unlike map switchMap is not wrapping the return value with observable but switches to return another observable
            switchMap((authData: { username: string, password: string }) => {
                // from promise to observable
                return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
                    .pipe(switchMap(() => {
                        // from promise to observable
                        return from(firebase.auth().currentUser.getIdToken());
                    }),
                        // mergeMap allows for multiple inner subscriptions to be active in the same time
                        mergeMap((token: string) => {
                            this.router.navigate(['/']);

                            return [
                                {
                                    type: AuthActions.SIGNIN
                                },
                                {
                                    type: AuthActions.SET_TOKEN,
                                    payload: token
                                }
                            ];
                        }),
                        catchError((error: Error) => {
                            console.log(error);
                            return of({
                                type: AuthActions.AUTH_ERROR,
                                payload: error
                            });
                        }));
            }));

    @Effect({ dispatch: false }) // do not dispatch more effects
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(tap(() => {
            firebase.auth().signOut();
            this.router.navigate(['/']);
        }));

}