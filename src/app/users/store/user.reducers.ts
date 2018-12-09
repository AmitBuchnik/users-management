import * as fromApp from '../../store/app.reducers';
import * as UserActions from './user.actions';
import { IUser } from '../user.model';

export interface IFeatureState extends fromApp.IAppState {
    users: IState;
}

export interface IState {
    users: IUser[];
    loaded: boolean;
}

export var intialState: IState = {
    users: [],
    loaded: false
};

export function userReducer(state = intialState, action: UserActions.UserActions) {
    switch (action.type) {
        case UserActions.SET_USERS:
            return {
                ...state,
                users: [...action.payload],
                loaded: true
            };

        case UserActions.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };

        case UserActions.UPDATE_USER:
            const user = state.users.find(u => u.id === action.payload.index);
            const updatedUser = {
                ...user,
                ...action.payload.user
            };

            let users = [...state.users];
            users = users.map(u => {
                if (u.id === action.payload.index) {
                    u = updatedUser;
                }
                return u;
            });

            return {
                ...state,
                users: users
            };

        case UserActions.DELETE_USER:
            let oldUsers = [...state.users];
            oldUsers = oldUsers.filter(u => u.id !== action.payload);

            return {
                ...state,
                users: oldUsers
            };

        // case UserActions.ERROR:
        //     return {
        //         ...state,
        //         loaded: false
        //     };

        default:
            return state;
    }
}
