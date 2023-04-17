import React, { ChangeEvent, useRef, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {
    // const TodoList = (props: TodoListPropsType) => { -----------works the same as const with FC above

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    };
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        const taskClasses = task.isDone ? "taskUndone" : "taskDone"

        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />
                <span className={taskClasses}>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    });
    const titleMaxLength = 25;
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength;
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthTooLong;
    const titleMaxLengthWarning = isTitleLengthTooLong ? <div style={{ color: "red" }}>Text is too long</div> : null;
    const userMessage = error ? <div style={{ color: "red" }}>Text is required!</div> : null;
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler();
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined;


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
                    className={inputClasses}
                    //ref={taskTitleInput}
                />
                <button
                    disabled={isAddBtnDisabled}
                    onClick={addTaskHandler}
                    //onClick={setTitleHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div className={"filter-btn-wrapper"}>
                <button
                    className={props.filter === "all"
                        ? "filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active"
                        ? "filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed"
                        ? "filter-btn-active"
                        : "filter-btn"}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;