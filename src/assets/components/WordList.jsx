import AddButton from "./AddButton";
import WordCard from "./WordCard";
import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import CancelButton from "./CancelButton";
import SaveButtonNew from "./SaveButtonNew";
import Error from "./Error";

function WordList({ wordStore }) {

    const [isAdding, setAdding] = useState(false);
    const [newWord, setNewWord] = useState([]);

    const handleAdd = () => setAdding(true);

    const addNewWord = () => {
        wordStore.add(newWord);
        setNewWord("");
        setAdding(false);
    };

    const handleChangeData = (e) => {
        const name = e.target.name;
        const info = e.target.value;
        setNewWord({ ...newWord, [name]: info });
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
                            wordStore.words.filter(word => {
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
                                        <input className='word__input' name='english' onChange={handleChangeData} />
                                        <input className='word__input' name='transcription' onChange={handleChangeData} />
                                        <input className='word__input' name='russian' onChange={handleChangeData} />
                                        <input className='word__input' name='tags' onChange={handleChangeData} />
                                    </div>
                                    <div className="word__control">
                                        <SaveButtonNew addNewWord={addNewWord} />
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
