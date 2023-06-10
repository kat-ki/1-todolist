import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

type PropsType = {
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
    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor: 'steelblue'
    }
    return (
        <div>
            <TextField error={!!error}
                       value={title}
                       id='outlined-basic'
                       label={error ? 'Title is required!' : 'Enter your text'}
                       variant='outlined'
                       size='small'
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            <Button onClick={addTask}
                    variant='contained'
                    style={buttonStyle}
            >+</Button>
        </div>
    );
};

export default AddItemForm;