import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ITask } from './task.model';

import * as fromUsers from '../users/store/user.reducers';
import * as fromTasks from '../tasks/store/tasks.reducers';
import * as TasksActions from './store/tasks.actions';

@Injectable({
    providedIn: 'root'
})
export class TasksResolver implements Resolve<Observable<ITask[]>> {
    constructor(private store: Store<fromUsers.IFeatureState>) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<ITask[]> {
        this.store.dispatch(new TasksActions.FetchTasks());

        return this.store.select('tasks')
            .pipe(filter((tasksState: fromTasks.IState) => tasksState && tasksState.loaded)
                , map((tasksState: fromTasks.IState) => tasksState.tasks)
                , take(1));

        // const tasksState$ = this.store.select('tasks')
        //     .pipe(debounceTime(1500)
        //         , distinctUntilChanged());
    }
}






