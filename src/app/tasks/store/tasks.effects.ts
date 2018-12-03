import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { HttpRequest, HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";

import * as TasksActions from './tasks.actions';
import * as fromApp from '../../store/app.reducers';
import { ITask } from "../task.model";

@Injectable()
export class TasksEffects {
    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.IAppState>) {
    }

    @Effect()
    tasksFetch = this.actions$
        .ofType(TasksActions.FETCH_TASKS)
        .pipe(switchMap((action: TasksActions.FetchTasks) => {
            return this.httpClient.get<ITask[]>('https://users-management-2e2ec.firebaseio.com//tasks.json');
        }),
            map((tasks) => {
                return {
                    type: TasksActions.SET_TASKS,
                    payload: tasks
                };
            }));

    @Effect({ dispatch: false })
    tasksStore = this.actions$
        .ofType(TasksActions.STORE_TASKS)
        .pipe(withLatestFrom(this.store.select('tasks')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://users-management-2e2ec.firebaseio.com//tasks.json', state.tasks);
                return this.httpClient.request(request);
            }));
}




