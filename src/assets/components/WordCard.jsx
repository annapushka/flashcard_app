import React, { useState, createRef, useEffect, useContext } from 'react';
import CancelButton from "./CancelButton";
import CheckButton from './CheckButton';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SaveButton from "./SaveButton";
import Error from "./Error";
import { DataContext } from "./DataContextProvider";

let classNames = require('classnames');

function WordCard(props) {

    const { handleDelete, loadData } = useContext(DataContext);
    const [error, setErorr] = useState('');

    //translation check
    const [pressed, setPressed] = useState(false);
    // changing word information
    const [isChanged, setChanged] = useState(false);
    //word information states
    const [data, setData] = useState({
        id: props.id,
        english: props.english,
        transcription: props.transcription,
        russian: props.russian,
        tags: props.tags
    });
    const [isVerified, setValid] = useState(true);
    //will the information about the word be changed
    const [isChangedInput, setChangedInput] = useState(false);


    //verification indicator
    let inputClass = classNames({
        'word__input': true,
        'notValid': !isVerified,
    });


    //disabled indicator
    let isDisabled = "";


    //translation check handler
    const handleChange = () => {
        setPressed(prevState => !prevState);
    }
    // changing word information handler
    const handleEdit = () => {
        setChanged(prevState => !prevState);
    }
    //word information change handler
    function handleChangeData(e) {
        const name = e.target.name;
        const info = e.target.value;
        if (isValid(info)) {
            setValid(true);
            // e.target.className = 'word__input';
            setData({ ...data, [name]: info });
        } else {
            // e.target.className = 'word__input notValid';
            setValid(false);
            setData({ ...data, [name]: info });
        }
    }
    //word general information change handler
    function saveNewHandler(e) {
        e.preventDefault();
        if (isVerified) {
            update(data.id);
        } else {
            isDisabled = "disabled";
            setChanged(prevState => !prevState);
        }
    }
    //reset changes
    function undoHandler() {
        setChangedInput(false);
    }


    //checking the entered new information about the word
    function isValid(element) { return (element.length > 0) ? true : false }


    function update(id) {
        fetch(`http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(() => loadData())
            .catch(error => {
                setErorr(error);
            });
        setChanged(true);
    }


    //focus on check button
    const ref = createRef();
    useEffect(() => (ref !== null) ? ref.current.focus() : '', []);


    return (
        <>
            {error ? (
                <Error />
            ) : (
                <div className="word" >
                    {isChanged ? (
                        <>
                            {!isVerified && <div className="verificationError">Please fill in all fields correctly...</div>}
                            <div className="word__data" id={props.id}>
                                <input className={inputClass} value={data.english} name='english' onChange={handleChangeData} />
                                <input className={inputClass} value={data.transcription} name='transcription' onChange={handleChangeData} />
                                <input className={inputClass} value={data.russian} name='russian' onChange={handleChangeData} />
                                <input className={inputClass} value={data.tags} name='tags' onChange={handleChangeData} />
                            </div>
                            <div onClick={handleEdit} className="word__control">
                                <SaveButton disabled={isDisabled} saveNewHandler={saveNewHandler} />
                                <CancelButton undoHandler={undoHandler} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="word__data">
                                <span className="word__text">{props.english}</span>
                                <span className="word__transcription">{props.transcription}</span>
                                {pressed ? (
                                    <span onClick={handleChange} className="word__russian">{props.russian}</span>
                                ) : (
                                    <CheckButton ref={ref} handleChange={handleChange} />
                                )}
                                <span className="word__tags">{props.tags}</span>
                            </div>
                            <div className="word__control">
                                <EditButton handleEdit={handleEdit} />
                                <DeleteButton handleDelete={handleDelete} id={props.id} />
                            </div>
                        </>
                    )
                    }
                </div >
            )}
        </>
    );
}

export default WordCard;