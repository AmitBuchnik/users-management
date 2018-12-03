import { ITask } from "../task.model";
import * as TasksActions from './tasks.actions';

export interface IState {
    tasks: ITask[];
}

export let intialState: IState = {
    tasks: []
};

export function tasksReducer(state = intialState, action: TasksActions.TasksActions) {
    switch (action.type) {
        case TasksActions.SET_TASKS:
            return {
                ...state,
                users: [...action.payload]
            };

        default:
            return state;
    }
}