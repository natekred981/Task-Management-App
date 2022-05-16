import React, { useState } from "react";
import CreateButton from "../../shared/components/CreateButton";
import SubmitButton from "../../shared/components/SubmitButton";
import Buttons from "./Components/ButtonGroup/ButtonGroup";
import Description from "./Components/Desription";
import Select from "./Components/Select";
import Title from "./Components/Title";
import "./Form.css";

const CreateTask = (props) => {
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
    window.location.reload(false);

  }
//<div className={`form-box ${props.display}`}></div>
  return (
    <>
      <div className='form-box'>
        <form classname="form" onSubmit={handleSubmit}>
          <Title name={[schemaNames[0]]} onChange={handleChange} value={state.title}/>
          <Select name={[schemaNames[1]]} onChange={handleChange} value={state.option}/>
          <Description name={schemaNames[2]} onChange= {handleChange} value={state.description}/>
          {/* <div style={{display: 'flex'}}>
            <CreateButton />
            <SubmitButton />
          </div>*/}
  </form> 
      </div>
    </>
  );
};

export default CreateTask;
