import { TasksStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, removeTodolistAC, RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACActionType = ReturnType<typeof changeTaskTitleAC>

export type TasksActionTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleACActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType,
                             action: TasksActionTypes)
    : TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }

        case "ADD-TASK":
            let newTask = { id: v1(), title: action.payload.title, isDone: false };
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? { ...t, isDone: action.payload.isDone }
                    : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? { ...t, title: action.payload.title }
                    : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = { ...state };
            delete copyState[action.todolistId];
            return copyState;

            // or
            // let {[action.todolistId]: [], ...rest} = state;
            // return rest;

        default:
            throw new Error('I do not understand this type');
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) =>  {
    return {
        type: "REMOVE-TASK",
        payload: { taskId, todolistId }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: { title, todolistId }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: { taskId, isDone, todolistId }
    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { taskId, title, todolistId }
    } as const
}
