import React from "react";

import './CreateButton.css';

const CreateButton = (props) => {
    return (
        <button
          className= 'button-create'
          type='button'
          onClick={props.onClick}
        >
          Create Task
        </button>
      );
}

export default CreateButton;