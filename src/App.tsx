import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>( [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ])
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const getTasksForView = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter (task => task.isDone === false)
            case "completed":
                return tasks.filter (task => task.isDone === true)
            default:
                return tasks
        }
    }
    const tasksToSee = getTasksForView (tasks, filter)

    return (
        <div className= "App">
            <TodoList
                title={todoListTitle}
                tasks={tasksToSee}
                removeTask={removeTask}
                changeFilter ={changeFilter}
            />
        </div>
    );
}

export default App;