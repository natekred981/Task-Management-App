import React, { useState } from "react";
import Card from "../../../shared/components/UiElements/Card";
import './Task.css';
import Modal from "../../../shared/components/UiElements/Modal";
import Button from "../../../shared/components/UiElements/Button";

const Task = (props) => {
  const [showTask, setShowTask] = useState(false);
  const openTask = () => setShowTask(true);
  const closeTask = () => setShowTask(false);
  //<Button danger>DELETE</Button>
  return (
    <React.Fragment>
      <Modal 
        show={showTask} 
        onCancel={closeTask} 
        header="NEW TASK" 
        contentClass="task-item__modal-content" 
        footeClass="task-item__modal-actions"
        footer={<Button onClick={closeTask}>CLOSE</Button>}

        >
          You have reached the modal!
          </Modal>
    <li className="task-item">
      <Card className="task-item__content">
        <div className="task-item_info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="task-item__actions">
          <Button to={`/${props.id}`}>EDIT</Button>
          <Button inverse onClick={openTask}>DELETE</Button>
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default Task;
