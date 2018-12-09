import { Action } from '@ngrx/store';

import { IUser } from '../user.model';

export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const STORE_USERS = 'STORE_USERS';
export const FETCH_USERS = 'FETCH_USERS';
export const FAILED_LOAD_USERS = 'FAILED_LOAD_USERS';

export class StoreUsers implements Action {
    readonly type = STORE_USERS;
}

export class FetchUsers implements Action {
    readonly type = FETCH_USERS;
}

export class SetUsers implements Action {
    readonly type = SET_USERS;

    constructor(public payload: IUser[]) {
    }
}

export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public payload: IUser) {
    }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;

    constructor(public payload: { index: number, user: IUser }) {
    }
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;

    constructor(public payload: number) {
    }
}

export class FailedLoadUsers implements Action {
    readonly type = FAILED_LOAD_USERS;

    constructor(public payload: string) {
    }
}

export type UserActions =
    SetUsers |
    AddUser |
    UpdateUser |
    DeleteUser |
    StoreUsers |
    FetchUsers |
    FailedLoadUsers;
