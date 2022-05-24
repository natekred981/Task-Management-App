import React, { useState } from "react";
import Card from "../../../shared/components/Card";
import './Task.css';

const Task = (props) => {
  const [showTask, setShowTask] = useState(false);
  const openTask = () => setShowTask(true);
  const closeTask = () => setShowTask(false);
  return (
    <li className="task-item">
      <Card>
        <div className="task-item_info">
          <h2>{props.title}</h2>
          <h3>{props.option}</h3>
          <p>{props.description}</p>
        </div>
      </Card>
    </li>
  );
};

export default Task;
