import WordCard from "./WordCard";
import React, { } from 'react';
import Back from "../img/arrow_back_icon.png";
import Forward from "../img/arrow_forward_icon.png";
import { observer, inject } from "mobx-react";
import { toJS } from 'mobx';


function CardSlider({ wordStore }) {

    const words = toJS(wordStore.words);
    const word = words[wordStore.count];

    let userResult;
    if (wordStore.learnedWords === wordStore.words.length) {
        userResult = <span className="learned-words__num">Keep it up! You learned <span className="learned-words__num_pink">ALL</span> the words!</span>;
    }
    else if (wordStore.learnedWords === 0) {
        userResult = <span className="learned-words__num">Here goes!</span>;
    }
    else {
        userResult = <span className="learned-words__num">You learned <span className="learned-words__num_pink">{wordStore.learnedWords}</span> out of {wordStore.words.length} today!</span>;
    }

    return (
        <>
            <div className="card-slider">
                <button className="card-slider__btn" onClick={() => wordStore.decrement()}>
                    <img src={Back} alt="" className="card-slider__icon" />
                </button>
                <WordCard key={word.id} {...word}></WordCard>
                <button className="card-slider__btn" onClick={() => wordStore.increment()}>
                    <img src={Forward} alt="" className="card-slider__icon" />
                </button>
            </div>
            <div className="learned-words">
                {userResult}
            </div>
        </>
    );
}

export default inject(["wordStore"])(observer(CardSlider));