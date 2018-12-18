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

        case TasksActions.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };

        case TasksActions.DELETE_TASK:
            let tasksCopy = [...state.tasks];
            tasksCopy = tasksCopy.filter(t => t.id !== action.payload);

            return {
                ...state,
                tasks: tasksCopy
            };

        case TasksActions.DELETE_TASKS:
            let tasks = [...state.tasks];
            tasks = tasks.filter(t => t.userId !== action.payload);

            return {
                ...state,
                tasks: tasks
            };

        default:
            return state;
    }
}