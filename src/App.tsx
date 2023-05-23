import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksAssocType = {
    [key: string]: TaskType[];
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksAssocType>({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

    const removeTodolist = (todolistsID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistsID));
        delete tasks[todolistsID];
    }

    function removeTask(todolistsID: string, taskId: string) {
        setTasks({ ...tasks, [todolistsID]: tasks[todolistsID].filter(el => el.id !== taskId) })
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistsID: string, title: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistsID]: [newTask, ...tasks[todolistsID]] })
        // let task = { id: v1(), title: title, isDone: false };
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistsID: string, taskId: string, isDone: boolean) {
        setTasks({ ...tasks, [todolistsID]: tasks[todolistsID].map(el => el.id === taskId ? { ...el, isDone } : el) })
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // setTasks([...tasks]);
    }

    function changeFilter(todolistsID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistsID ? { ...el, filter: value } : el))
        // setFilter(value);
    }

    return (
        <div className="App">
            {todolists.map((el, index) => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistsID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;