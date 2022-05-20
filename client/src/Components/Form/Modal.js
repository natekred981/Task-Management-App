import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Button onClick={props.onCancel} type="button" variant="secondary" >Close</Button>
    <Button type="submit" variant="primary" onSubmit={props.onSubmit}>Save changes</Button>
  </Modal.Footer>
  </Modal>
    );
}

export default UserModal;

