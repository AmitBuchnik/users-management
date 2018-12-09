import { Action } from '@ngrx/store';

import { ITask } from '../task.model';

export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const STORE_TASKS = 'STORE_TASKS';
export const FETCH_TASKS = 'FETCH_TASKS';
export const FAILED_LOAD_TASKS = 'FAILED_LOAD_TASKS';

export class StoreTasks implements Action {
    readonly type = STORE_TASKS;
}

export class FetchTasks implements Action {
    readonly type = FETCH_TASKS;
}

export class SetTasks implements Action {
    readonly type = SET_TASKS;

    constructor(public payload: ITask[]) {
    }
}

export class AddTask implements Action {
    readonly type = ADD_TASK;

    constructor(public payload: ITask) {
    }
}

export class FailedLoadTasks implements Action {
    readonly type = FAILED_LOAD_TASKS;

    constructor(public payload: string) {
    }
}

export type TasksActions =
    SetTasks |
    AddTask |
    StoreTasks |
    FetchTasks |
    FailedLoadTasks;
