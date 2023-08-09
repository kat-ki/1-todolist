import React, { ChangeEvent, memo, useCallback } from 'react';
import { Checkbox } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TaskType } from "./Todolist";

type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}
export const Task = memo(({
                              task,
                              changeTaskTitle,
                              changeTaskStatus,
                              removeTask
                          }: TaskPropsType) => {
    const { id, title, isDone } = task;
    const onClickHandler = () => removeTask(id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(id, newValue)
    }, [id])

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