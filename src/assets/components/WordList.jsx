import AddButton from "./AddButton";
import WordCard from "./WordCard";
import React, { useState, useContext } from "react";
import { DataContext } from "../components/DataContextProvider";
import CancelButton from "./CancelButton";
import SaveButtonNew from "./SaveButtonNew";
import Error from "./Error";

function WordList(props) {

    const { data, loadData } = useContext(DataContext);
    const cardArray = [...data];
    const [isAdding, setAdding] = useState(false);
    const [newWord, setNewWord] = useState([]);
    const [error, setErorr] = useState('');

    function handleAdd() { setAdding(true) }

    function add() {
        fetch('https://cors-everywhere.herokuapp.com/http://itgirlschool.justmakeit.ru/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newWord)
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
        setAdding(false);
    }

    function handleChangeData(e) {
        const name = e.target.name;
        const info = e.target.value;
        setNewWord({ ...newWord, [name]: info });
    }

    const undoHandler = () => {
        setAdding(false);
    }

    return (
        <>
            {error ? (
                <Error />
            ) : (
                < div className="list-box" >
                    <div className="list">
                        {
                            cardArray.filter(word => {
                                if (props.saerchTearm === '') { return word }
                                else if (word.english.toLowerCase().includes(props.saerchTearm.toLowerCase())) { return word }
                            }).map((word) =>
                                <WordCard words={cardArray} key={word.id} {...word} />
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
                                        <SaveButtonNew add={add} />
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

export default WordList;
