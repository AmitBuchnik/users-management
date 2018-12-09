import { IPost } from "../post.model";
import * as PostsActions from './posts.actions';

export interface IState {
    posts: IPost[];
    loaded: boolean;
}

export let intialState: IState = {
    posts: [],
    loaded: false
};

export function postsReducer(state = intialState, action: PostsActions.PostsActions) {
    switch (action.type) {
        case PostsActions.SET_POSTS:
            return {
                ...state,
                posts: [...action.payload],
                loaded: true
            };

        default:
            return state;
    }
}