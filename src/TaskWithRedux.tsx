import React, { ChangeEvent, memo, useCallback } from 'react';
import { Checkbox } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./TodoList";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {
    console.log('task')
    const { id, title, isDone } = task;

    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId));
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId));
    }, [id, todolistId])

    return (
        <div key={id} className={isDone ? "is-done" : ""}>
            <Checkbox
                checked={isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
});