import React, { useState } from "react";
import Button from "../../shared/components/Button";
import Description from "./Components/Desription";
import Select from "./Components/Select";
import Title from "./Components/Title";
import "./Form.css";

const CreateTask = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4001/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'koo',
        option: 'ok',
        description: 'i99',
        creator: '4'
      })
    });

    let responseData = await response.json();
    console.log(responseData);

  }
  return (
    <>
      <div className="form-box">
        <h1>Task Details</h1>
        <form onSubmit={handleSubmit}>
          <Title />
          <Select />
          <Description />
          <Button />
        </form>
      </div>
    </>
  );
};

export default CreateTask;
