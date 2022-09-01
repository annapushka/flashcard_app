import WordCard from "./WordCard";
import React, { useState, useContext } from 'react';
import Back from "../img/arrow_back_icon.png";
import Forward from "../img/arrow_forward_icon.png";
import { DataContext } from "./DataContextProvider";

function CardSlider(props) {
    const [count, setCount] = useState(0);
    const [learnedWords, setLearnedWords] = useState(0);

    const { data } = useContext(DataContext);
    const { id, ...itemData } = data[count];



    const handleCountNext = () => {
        setCount(prevState => (prevState < data.length - 1) ? prevState + 1 : 0);
        setLearnedWords(prevState => (prevState < data.length - 1) ? prevState + 1 : data.length);
    }
    const handleCountBack = () => {
        setCount(prevState => (prevState > 0) ? prevState - 1 : data.length - 1);
    }

    let userResult;
    if (learnedWords === data.length) {
        userResult = <span className="learned-words__num">Keep it up! You learned <span className="learned-words__num_pink">ALL</span> the words!</span>;
    }
    else if (learnedWords === 0) {
        userResult = <span className="learned-words__num">Here goes!</span>;
    }
    else {
        userResult = <span className="learned-words__num">You learned <span className="learned-words__num_pink">{learnedWords}</span> out of {data.length} today!</span>;
    }

    return (
        <>
            <div className="card-slider">
                <button className="card-slider__btn" onClick={handleCountBack}>
                    <img src={Back} alt="" className="card-slider__icon" />
                </button>
                <WordCard key={id} {...itemData}></WordCard>
                <button className="card-slider__btn" onClick={handleCountNext}>
                    <img src={Forward} alt="" className="card-slider__icon" />
                </button>
            </div>
            <div className="learned-words">
                {userResult}
            </div>
        </>
    );
}

export default CardSlider;