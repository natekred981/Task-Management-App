import React from "react";
import Button from "../../shared/components/Button";
import { Button as Button2} from "react-bootstrap";
import './Modal.css';
import { Modal } from "react-bootstrap";
import CreateTask from "./Form";

const UserModal = props => {

    return (
      <Modal show={props.show}>
        
  <Modal.Header>
    <Modal.Title>Modal title</Modal.Title>
  </Modal.Header>
        
  <Modal.Body>
    <CreateTask />
  </Modal.Body>
  

  <Modal.Footer>
    <Button2 onClick={props.onCancel} type="button" variant="secondary" >Close</Button2>
    <Button type="submit"  >Save changes</Button>
    <button type="submit" onSubmit={props.onSubmit}>ADD TASK</button>
  </Modal.Footer>
  </Modal>
    );
}

export default UserModal;

