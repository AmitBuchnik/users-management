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

        case PostsActions.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };

        case PostsActions.DELETE_POST:
            let postsCopy = [...state.posts];
            postsCopy = postsCopy.filter(p => p.id !== action.payload);

            return {
                ...state,
                posts: postsCopy
            };

        case PostsActions.DELETE_POSTS:
            let posts = [...state.posts];
            posts = posts.filter(p => p.userId !== action.payload);

            return {
                ...state,
                posts: posts
            };

        default:
            return state;
    }
}