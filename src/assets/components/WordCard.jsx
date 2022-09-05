import React, { useState, createRef, useEffect } from 'react';
import CancelButton from "./CancelButton";
import CheckButton from './CheckButton';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SaveButton from "./SaveButton";
import Error from "./Error";
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';

let classNames = require('classnames');

function WordCard({ wordStore, id }) {

    const words = toJS(wordStore.words);
    const index = words.map(object => object.id).indexOf(id);
    const word = words[index];

    //translation check
    const [pressed, setPressed] = useState(false);
    // changing word information
    const [isChanged, setChanged] = useState(false);
    //word information states
    const [data, setData] = useState({
        id: word.id,
        english: word.english,
        transcription: word.transcription,
        russian: word.russian,
        tags: word.tags
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
    const handleChange = () => setPressed(prevState => !prevState);

    // changing word information handler
    const handleEdit = () => setChanged(prevState => !prevState);

    //word information change handler
    const handleChangeData = (e) => {
        const name = e.target.name;
        const info = e.target.value;
        if (wordStore.isValid(info)) {
            setValid(true);
            setData({ ...data, [name]: info });
        } else {
            setValid(false);
            setData({ ...data, [name]: info });
        }
    }
    //word general information change handler
    const saveNewHandler = (e) => {
        e.preventDefault();
        if (isVerified) {
            wordStore.update(data.id, data);
            setChanged(true);
        } else {
            isDisabled = "disabled";
            setChanged(prevState => !prevState);
        }
    }
    //reset changes
    const undoHandler = () => setChangedInput(false);

    const handleDelete = (e) => {
        const id = e.target.id;
        wordStore.remove(id);
    }

    //focus on check button
    const ref = createRef();
    useEffect(() => (ref !== null) ? ref.current.focus() : '', []);


    return (
        <>
            {wordStore.error ? (
                <Error />
            ) : (
                <div className="word" >
                    {isChanged ? (
                        <>
                            {!isVerified && <div className="verificationError">Please fill in all fields correctly...</div>}
                            <div className="word__data" id={word.id}>
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
                                <span className="word__text">{word.english}</span>
                                <span className="word__transcription">{word.transcription}</span>
                                {pressed ? (
                                    <span onClick={handleChange} className="word__russian">{word.russian}</span>
                                ) : (
                                    <CheckButton ref={ref} handleChange={handleChange} />
                                )}
                                <span className="word__tags">{word.tags}</span>
                            </div>
                            <div className="word__control">
                                <EditButton handleEdit={handleEdit} />
                                <DeleteButton handleDelete={handleDelete} id={word.id} />
                            </div>
                        </>
                    )
                    }
                </div >
            )}
        </>
    );
}

export default inject(["wordStore"])(observer(WordCard));
