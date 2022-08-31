import React, {
    forwardRef,
} from 'react';

const CheckButton = React.forwardRef((props, ref) => (

    <button ref={ref} onClick={props.handleChange} className="word__check">let's check...</button>));

export default CheckButton;