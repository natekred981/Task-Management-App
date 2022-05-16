import React from "react";
import './Title.css';

const Title = (props) => {
    return (
        <input className="title"
        name={props.name} placeholder="Title" 
               onChange={props.onChange} value={props.value}></input>
    );
}

export default Title;