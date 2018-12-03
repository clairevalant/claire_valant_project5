// Dragon component to put my dragons on the page
import React from 'react';

const Dragon = (props) => {
    return (
        <p onClick={props.onClick} onDragStart={props.onDragStart} draggable="true" className={props.onDragEnd ? "dragon character" : "dragon character dropped"} id={props.title} >{props.character}</p>
    )
}

export default Dragon;