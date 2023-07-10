import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { combineReducers, createStore, legacy_createStore } from "redux";

// combine reducers in order to get the structure of the only object-state
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// creating the store
export const store = legacy_createStore(rootReducer);

// define the type of the entire object state automatically
export type AppRootStateType = ReturnType<typeof rootReducer>

// to refer to store in any moment in the console
// @ts-ignore
window.store = store;