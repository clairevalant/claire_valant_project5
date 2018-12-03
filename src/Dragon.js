// Dragon component to put my dragons on the page
import React from 'react';
// import dragonImg from "./assets/dragon1.png";

const Dragon = (props) => {
    return (
        // <p onClick={props.onClick} onDragStart={props.onDragStart} draggable="true" className={props.onDragEnd ? "dragon character" : "dragon character dropped"} id={props.title} >{props.character}</p>
        <img src={props.imgPath} alt="Draggable dragon" onClick={props.onClick} onDragStart={props.onDragStart} draggable="true" className={props.onDragEnd ? "dragon character" : "dragon character dropped"} id={`${props.title}`}/>
    )
}

export default Dragon;