import AddButton from "./AddButton";
import WordCard from "./WordCard";
import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import CancelButton from "./CancelButton";
import SaveButtonNew from "./SaveButtonNew";
import Error from "./Error";
import { toJS } from 'mobx';

let classNames = require('classnames');

function WordList({ wordStore }) {

    const words = toJS(wordStore.words);

    const [isAdding, setAdding] = useState(false);
    const [newWord, setNewWord] = useState([]);
    const [isVerified, setValid] = useState(true);

    //verification indicator
    let inputClass = classNames({
        'word__input': true,
        'notValid': !isVerified,
    });

    //disabled indicator
    let isDisabled = "";

    const handleAdd = () => setAdding(true);

    const addNewWord = (e) => {
        e.preventDefault();
        if (isVerified) {
            wordStore.add(newWord);
            console.log(newWord);
            setNewWord("");
            setAdding(false);
            setValid(false);
        } else {
            isDisabled = "disabled";
        }
    };

    const handleChangeData = (e) => {
        const name = e.target.name;
        const info = e.target.value;
        if (wordStore.isValid(info)) {
            setValid(true);
            setNewWord({ ...newWord, [name]: info });
        } else {
            setValid(false);
            setNewWord({ ...newWord, [name]: info });
        }
    }




    const undoHandler = () => setAdding(false);

    return (
        <>
            {wordStore.error ? (
                <Error />
            ) : (
                < div className="list-box" >
                    <div className="list">
                        {
                            words.filter((word, index) => {
                                if (wordStore.saerchTearm === '') { return word }
                                else if (word.english.toLowerCase().includes(wordStore.saerchTearm.toLowerCase())) { return word }
                            }).map((word) =>
                                <WordCard key={word.id} {...word} />
                            )
                        }
                    </div>
                    <div className="list__control">
                        {
                            isAdding ? (
                                <div className="word _new">
                                    <div className="word__data">
                                        <input className={inputClass} name='english' onChange={handleChangeData} placeholder='english' />
                                        <input className={inputClass} name='transcription' onChange={handleChangeData} placeholder='transcription' />
                                        <input className={inputClass} name='russian' onChange={handleChangeData} placeholder='russian' />
                                        <input className={inputClass} name='tags' onChange={handleChangeData} placeholder='tags' />
                                    </div>
                                    <div className="word__control">
                                        <SaveButtonNew disabled={isDisabled} addNewWord={addNewWord} />
                                        <CancelButton undoHandler={undoHandler} />
                                    </div>
                                </div>
                            ) : (
                                <AddButton handleAdd={handleAdd} />
                            )
                        }
                    </div>
                </div>
            )}
        </>
    );
}

export default inject(["wordStore"])(observer(WordList));
