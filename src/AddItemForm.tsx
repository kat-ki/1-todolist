import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from "@mui/material";

type PropsType= {
    callBack: (title: string) => void
}
export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<boolean>(false);

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError(true);
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addTask();
        }
    }
const errorMessage = <div className="error-message">Title is required</div>;
    return (
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && errorMessage}
            </div>
    );
};

export default AddItemForm;