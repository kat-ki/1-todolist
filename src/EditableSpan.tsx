import React, { ChangeEvent, useState } from 'react';

type PropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false);
    let [updateTitle, setUpdateTitle] = useState(props.oldTitle);
    const editFoo = () => {
        setEdit(!edit);
        if (edit) {
            addTaskHandler();
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.callBack(updateTitle);
    }

    return (
        edit
            ? <input onChange={onChangeHandler} value={updateTitle} onBlur={editFoo} autoFocus/>
            : <span onDoubleClick={editFoo}>{props.oldTitle}</span>
    );
};

