import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";
import {
    AddTodolistAC, ChangeFilterAC,
    ChangeFilterActionType,
    RemoveTodolistAC,
    todolistsReducer, UpdateTodolistAC,
    UpdateTodolistActionType
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endstate = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endstate.length).toBe(1);
    expect(endstate[0].id).toBe(todolistId2);
});

test('new todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New todolist';

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]

    const endstate = todolistsReducer(startState, AddTodolistAC(newTodolistTitle, v1()))

    expect(endstate.length).toBe(3);
    expect(endstate[0].title).toBe(newTodolistTitle);
});

test('todolist title should be updated', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New todolist';

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
    const action: UpdateTodolistActionType = UpdateTodolistAC(todolistId2, newTodolistTitle)
    const endstate = todolistsReducer(startState, action)

    expect(endstate[0].title).toBe('What to learn');
    expect(endstate[1].title).toBe(newTodolistTitle);
});

test('filter should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter: FilterValuesType = 'completed';

    const startState: TodolistType[] = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
    const action: ChangeFilterActionType = ChangeFilterAC(newFilter, todolistId2)
    const endstate = todolistsReducer(startState, action)

    expect(endstate[0].filter).toBe('all');
    expect(endstate[1].filter).toBe(newFilter);
});