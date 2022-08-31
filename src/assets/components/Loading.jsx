import React from 'react';

function Loading(props) {
    return (
        <div className="loading">
            <div className='dots-container'>
                <div className='dot'></div>
                <div className='dot'>
                    <div className='face'></div>
                </div>
                <div className='dot'></div>
            </div>
        </div>

    );
}

export default Loading;