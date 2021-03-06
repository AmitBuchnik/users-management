import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpRequest, HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { empty, of } from "rxjs";
import { map, switchMap, withLatestFrom, filter, catchError } from "rxjs/operators";

import * as TasksActions from './tasks.actions';
import * as fromApp from '../../store/app.reducers';
import { ITask } from "../task.model";

@Injectable()
export class TasksEffects {
    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.IAppState>) {
    }

    @Effect()
    postsFetch = this.actions$
        .ofType(TasksActions.FETCH_TASKS)
        .pipe(withLatestFrom(this.store.select('tasks'))
            , switchMap(([action, state]) => {
                if (state.loaded) {
                    return empty();
                }

                return this.http.get<ITask[]>('https://users-management-2e2ec.firebaseio.com//tasks.json')
                    .pipe(switchMap(tasks => {
                        if (!tasks || tasks.length === 0) {
                            return this.http.get<ITask[]>('https://jsonplaceholder.typicode.com/todos')
                        }
                        return of(tasks);
                    }),
                        filter(tasks => tasks != null),
                        map((tasks) => {
                            return {
                                type: TasksActions.SET_TASKS,
                                payload: tasks
                            };
                        }),
                        catchError((error: Error) => {
                            console.log(error);
                            return of({
                                type: TasksActions.FAILED_LOAD_TASKS,
                                payload: error.message
                            });
                        }));
            }));

    // @Effect()
    // tasksFetch = this.actions$
    //     .ofType(TasksActions.FETCH_TASKS)
    //     .pipe(switchMap((action: TasksActions.FetchTasks) => {
    //         return this.http.get<ITask[]>('https://users-management-2e2ec.firebaseio.com//tasks.json');
    //     }),
    //         map((tasks) => {
    //             return {
    //                 type: TasksActions.SET_TASKS,
    //                 payload: tasks
    //             };
    //         }));

    @Effect({ dispatch: false })
    tasksStore = this.actions$
        .ofType(TasksActions.STORE_TASKS)
        .pipe(withLatestFrom(this.store.select('tasks')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://users-management-2e2ec.firebaseio.com//tasks.json', state.tasks);
                return this.http.request(request);
            }));
}




