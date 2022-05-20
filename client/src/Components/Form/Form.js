import React, { useState } from "react";
import Input from "../../shared/components/Input";
import Description from "./Components/Desription";
import Select from "./Components/Select";
import Title from "./Components/Title";
import "./Form.css";

const CreateTask = (props) => {
  return (
    <>
      <div className='form-box'>
          <Input element="input" type="text" label="Title" errorText="Please enter a valid title" />
          <Select name={"option"} onChange={props.onChange} value={props.value} />
          <Input label="Description" errorText="Please enter a valid description" />
      </div>
    </>
  );
};

export default CreateTask;
