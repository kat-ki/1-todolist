import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST' // what to do
    todolistID: string // parameters needed for that task
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST' // what to do
    newTitle: string // parameters needed for that task
    todolistID: string
}

export type UpdateTodolistActionType = {
    type: 'UPDATE-TODOLIST' // what to do
    todolistId: string // parameters needed for that task
    updateTitle: string
}

export type ChangeFilterActionType = {
    type: 'CHANGE-FILTER' // what to do
    value: FilterValuesType// parameters needed for that task
    todolistId: string
}

export type ActionTypes =
    RemoveTodolistActionType |
    AddTodolistActionType |
    UpdateTodolistActionType |
    ChangeFilterActionType

export const todolistsReducer = (todolists: TodolistType[],
                                 action: ActionTypes)
    : TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id != action.todolistID);
        case "ADD-TODOLIST":
            const newTodo: TodolistType = { id: action.todolistID, title: action.newTitle, filter: 'all' };
            return [newTodo, ...todolists];
        case "UPDATE-TODOLIST":
            return todolists.map(el => el.id === action.todolistId ? { ...el, title: action.updateTitle } : el);
        case "CHANGE-FILTER":
            let todolist = todolists.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;
            }
            return [...todolists];

        default:
            return todolists;
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        todolistID: id
    }
}
export const AddTodolistAC = (newTitle: string, todolistID: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        newTitle: newTitle,
        todolistID: todolistID
    }
}
export const UpdateTodolistAC = (todolistId: string, updateTitle: string): UpdateTodolistActionType => {
    return {
        type: 'UPDATE-TODOLIST',
        todolistId: todolistId,
        updateTitle: updateTitle
    }
}
export const ChangeFilterAC = (value: FilterValuesType, todolistId: string): ChangeFilterActionType => {
    return {
        type: 'CHANGE-FILTER',
        value: value,
        todolistId: todolistId
    }
}