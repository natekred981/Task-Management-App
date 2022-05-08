import React from "react";
import Card from "../../shared/components/Card";

const Task =  props => {
    <li className="task-item">
        <Card>
            <div className="user-item_info">
                <h2>{props.run}</h2>
                <h3>{props.option}</h3>
            </div>
        </Card>
    </li>
}

export default Task;