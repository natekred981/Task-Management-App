import React, { useContext, useState } from "react";
import Card from "../../../shared/components/UiElements/Card";
import './Task.css';
import Modal from "../../../shared/components/UiElements/Modal";
import Button from "../../../shared/components/UiElements/Button";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UiElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

const Task = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError} = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(`http://localhost:4001/api/tasks/${props.id}`,
                  'DELETE');
      props.onDelete(props.id);
      history.push(`/${auth.userId}/tasks`);
    }
    catch (err){};
  }
  //<Button danger>DELETE</Button>
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      
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
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="task-item_info">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="task-item__actions">
          {auth.isLoggedIn && (
            <Button to={`/update/${props.id}`}>EDIT</Button>
          )}
          {auth.isLoggedIn && (
            <Button inverse onClick={showDeleteWarningHandler}>DELETE</Button>
          )}
          
        </div>
      </Card>
    </li>
    </React.Fragment>
  );
};

export default Task;
