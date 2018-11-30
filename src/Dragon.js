// Dragon component to put my dragons on the page
import React from 'react';

const Dragon = (props) => {
    return (
        <p onClick={props.onClick} className="dragon character" id="dragon">{props.character}</p>
    )
}

export default Dragon;