import React from "react";
import './Title.css';

const Title = (props) => {
    return (
        <input className="title"
        name={props.name} placeholder="title" 
               onChange={props.onChange} value={props.value}></input>
    );
}

export default Title;