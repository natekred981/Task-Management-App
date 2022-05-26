import React, { useState } from "react";
import Card from "../../../shared/components/UiElements/Card";
import './Task.css';
import Modal from "../../../shared/components/UiElements/Modal";
import Button from "../../../shared/components/UiElements/Button";

const Task = (props) => {
  const [showTask, setShowTask] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openTask = () => setShowTask(true);
  const closeTask = () => setShowTask(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("Deleting ....");
  }
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
      <Modal
      show={showConfirmModal}
      onCancel={cancelDeleteHandler}
      header="Are you sure?"
      footeClass="task-item__modal-actions" 
      footer={
        <React.Fragment>
          <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
          <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
        </React.Fragment>
      }
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
    <li className="task-item">
      <Card className="task-item__content">
        <div className="task-item_info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="task-item__actions">
          <Button to={`/${props.id}`}>EDIT</Button>
          <Button inverse onClick={showDeleteWarningHandler}>DELETE</Button>
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default Task;
