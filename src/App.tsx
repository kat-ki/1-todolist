import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";
import { TaskType } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle: string = "WHAT TO LEARN"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS/TS", isDone: false },
        { id: v1(), title: "React", isDone: false }
    ])
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = { id: v1(), title: title, isDone: false };
        setTasks([newTask, ...tasks]);
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone: newIsDoneValue } : task))
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter)
    }
    const getTasksForView = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
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
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}

            />
        </div>
    );
}

export default App;
