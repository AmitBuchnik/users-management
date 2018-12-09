import { ITask } from "../task.model";
import * as TasksActions from './tasks.actions';

export interface IState {
    tasks: ITask[];
    loaded: boolean;
}

export let intialState: IState = {
    tasks: [],
    loaded: false
};

export function tasksReducer(state = intialState, action: TasksActions.TasksActions) {
    switch (action.type) {
        case TasksActions.SET_TASKS:
            return {
                ...state,
                tasks: [...action.payload],
                loaded: true
            };

        default:
            return state;
    }
}