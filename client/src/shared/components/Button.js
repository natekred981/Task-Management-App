import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = props => {
  return (
    <button
      className= 'button'
      type="submit"
    >
      Submit Task
    </button>
  );
};

export default Button;
