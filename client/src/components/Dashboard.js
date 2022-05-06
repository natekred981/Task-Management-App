import React from "react";
import Task from "./Task.js";

const Tasklist = props => {
    if (props.items.length === 0){
        return (
        <div className="center">
            <h2>No users found</h2>
        </div>
        )
    }

    return <ul>
        {props.items.map(task => {
            return <Task />
        })}
    </ul>
};

export default Tasklist;