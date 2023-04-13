import React, { useState } from "react";
import { FilterValuesType } from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {
    // const TodoList = (props: TodoListPropsType) => { -----------works the same as const with FC above

    const [newTaskTitle, setNewTaskTitle] = useState("");


    const tasksListItems: Array<JSX.Element> = props.tasks.map((task) => {
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={(e) => props.removeTask(task.id)}>X</button>
            </li>
        )
    })

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(e) => {
                    setNewTaskTitle(e.currentTarget.value)
                }}
                onKeyPress={ (e) => {
                  if (e.ctrlKey || e.charCode === 13) {
                      props.addTask(newTaskTitle);
                      setNewTaskTitle("");
                  }
                } }
                />
                <button onClick={() => {
                    props.addTask(newTaskTitle);
                    setNewTaskTitle("");
                }}>+
                </button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={(e) => props.changeFilter("all")}>All</button>
                <button onClick={(e) => props.changeFilter("active")}>Active</button>
                <button onClick={(e) => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;