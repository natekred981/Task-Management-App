import React from 'react';

import './SubmitButton.css';

const SubmitButton = props => {
  return (
    <button
      className= 'button-submit'
      type="submit"
    >
      Submit Task
    </button>
  );
};

export default SubmitButton;