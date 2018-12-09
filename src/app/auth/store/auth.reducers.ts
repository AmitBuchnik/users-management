import * as AuthActions from './auth.actions';

export interface IState {
    token: string;
    authenticated: boolean;
    error: string;
}

const initialState: IState = {
    token: null,
    authenticated: false,
    error: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                error: null,
                authenticated: true
            };

        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                error: null,
                authenticated: false
            };

        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case AuthActions.AUTH_ERROR:
            return {
                ...state,
                token: null,
                authenticated: false,
                error: action.payload
            };

        default:
            return state;
    }
}
