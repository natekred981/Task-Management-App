import React, { useState } from "react";


import './Select.css';

const Select = (props) => {
  //name={props.name}
  return (
    <React.Fragment>
      <label> What type of task? </label>
      <select name={props.name} id="task-type" value={props.value} onChange={props.onChange}>
        <option value="excercise">Excercise</option>
        <option value="study time">Study Time</option>
        <option value="cooking">Coconut</option>
        <option value="grocery shopping">Grocery Shopping</option>
        <option value="reading">Reading</option>
        <option value="tv time">TV Time</option>
        <option value="social time">Social Time</option>
        <option value="other">Other</option>
      </select>
    </React.Fragment>
  );
};

export default Select;
