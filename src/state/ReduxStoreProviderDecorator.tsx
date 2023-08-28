import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { combineReducers } from 'redux';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { legacy_createStore } from "redux";

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    const rootReducer = combineReducers({
        tasks: tasksReducer,
        todolists: todolistsReducer
    })

// creating the store
     const store = legacy_createStore(rootReducer);

// define the type of the entire object state automatically
     type AppRootStateType = ReturnType<typeof rootReducer>

    return <Provider store={store}>{storyFn()}</Provider>
};
