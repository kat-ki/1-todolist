import React, { ChangeEvent, useRef, KeyboardEvent, useState } from "react";
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

    const [title, setTitle] = useState<string>("");
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler();
    const tasksListItems: Array<JSX.Element> = props.tasks.map((task) => {
        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={(e) => props.removeTask(task.id)}>X</button>
            </li>
        )
    });
    const titleMaxLength = 25;
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength;
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong;
    const titleMaxLengthWarning = isTitleLengthTooLong ? <div style={{ color: "red" }}>Title is too long</div> : null;
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }

    // const taskTitleInput = useRef<HTMLInputElement>(null);
    // const setTitleHandler = () => {
    //     if (taskTitleInput.current) {
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ""
    //     }
    // }


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Enter your task"
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                    //ref={taskTitleInput}
                />
                <button
                    disabled={isAddBtnDisabled}
                    onClick={addTaskHandler}
                    //onClick={setTitleHandler}
                >+
                </button>
                {titleMaxLengthWarning}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;