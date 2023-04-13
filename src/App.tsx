import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";
import { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS/TS", isDone: true },
        { id: v1(), title: "React", isDone: false }
    ])
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const getTasksForView = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(task => task.isDone === false)
            case "completed":
                return tasks.filter(task => task.isDone === true)
            default:
                return tasks
        }
    }
    const tasksToSee = getTasksForView(tasks, filter)

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksToSee}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
