import React, { useState } from "react";
import Button from "../../shared/components/Button";
import Description from "./Components/Desription";
import Select from "./Components/Select";
import Title from "./Components/Title";
import "./Form.css";

const CreateTask = () => {
  const schemaNames = ["title", "option", "description"];
  const [state, setState] = useState(
    {
      [schemaNames[0]]: "",
      [schemaNames[1]]: "excercise",
      [schemaNames[2]]: ""
    }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
       ...prevState,
       [name]: value
    })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4001/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: state.title,
        option: state.option,
        description: state.description,
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
          <Title name={[schemaNames[0]]} onChange={handleChange} value={state.title}/>
          <Select name={[schemaNames[1]]} onChange={handleChange} value={state.option}/>
          <Description name={schemaNames[2]} onChange= {handleChange} value={state.description}/>
          <Button />
        </form>
      </div>
    </>
  );
};

export default CreateTask;
