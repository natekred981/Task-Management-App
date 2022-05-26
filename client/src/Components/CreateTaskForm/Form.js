import React, { useState, useCallback, useReducer } from "react";
import Button from "../../shared/components/UiElements/Button";
import Input from "../../shared/components/UiElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import "./Form.css";
import { useForm } from "../../shared/hooks/form-hook";




const CreateTask = (props) => {
  const  [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  

  const [state, setState] = useState(
    {
      title: "",
      description: ""
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
       ...prevState,
       [name]: value
    })); 
  };

    // const handleSubmit = async (e) => {
    //   e.preventDefault();
      
  
    //   
  
  
    //   console.log(responseData);
    //   window.location.reload(false);
  
    // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: "A",
          description: "B",
        })
      });
      let responseData = await response.json();
      console.log(responseData);
    
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='form-box'>
          <Input 
            element="input"
            type="text"
            label="Title" 
            errorText="Please enter a valid title" 
            validators={[VALIDATOR_REQUIRE()]} 
            onInput={inputHandler}
            />
          <Input 
            label="Description"
            errorText="Please enter a valid description (at least 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            />
          <Button type="submit">
            ADD TASK
          </Button>
      </form>
    </>
  );
};

export default CreateTask;
