import React from 'react';
import error from '../img/error.png'


function Error(props) {
    return (
        <div className='error'>
            <span className="error__text">We'll make sure to fix it</span>
            <img src={error} alt="logo" className="error__img" />
            <span className="error__text">only if it's not a broken heart...</span>
        </div>
    );
}

export default Error;