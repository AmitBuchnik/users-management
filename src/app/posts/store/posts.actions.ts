import { Action } from '@ngrx/store';

import { IPost } from '../post.model';

export const SET_POSTS = 'SET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POSTS = 'DELETE_POSTS';
export const STORE_POSTS = 'STORE_POSTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FAILED_LOAD_POSTS = 'FAILED_LOAD_POSTS';

export class StorePosts implements Action {
    readonly type = STORE_POSTS;
}

export class FetchPosts implements Action {
    readonly type = FETCH_POSTS;
}

export class SetPosts implements Action {
    readonly type = SET_POSTS;

    constructor(public payload: IPost[]) {
    }
}

export class AddPost implements Action {
    readonly type = ADD_POST;

    constructor(public payload: IPost) {
    }
}

export class DeletePost implements Action {
    readonly type = DELETE_POST;

    constructor(public payload: number) {
    }
}

export class DeletePosts implements Action {
    readonly type = DELETE_POSTS;

    constructor(public payload: number) {
    }
}

export class FailedLoadPosts implements Action {
    readonly type = FAILED_LOAD_POSTS;

    constructor(public payload: string) {
    }
}

export type PostsActions =
    SetPosts |
    AddPost |
    DeletePost |
    DeletePosts |
    StorePosts |
    FetchPosts |
    FailedLoadPosts;
