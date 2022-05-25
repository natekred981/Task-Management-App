import React, { useState, useCallback, useReducer } from "react";
import Button from "../../shared/components/UiElements/Button";
import Input from "../../shared/components/UiElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import "./Form.css";


const formReducer = (state, action) => {
  switch (action.type){
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs){
        if (inputId === action.inputId){
          formIsValid = formIsValid && action.isValid; 
        }
        else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      }
    default:
      return state;
  }
}

const CreateTask = (props) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });
  const inputHandler = useCallback((id, value, isValid) => {
      //wanna find whether the form is valid
      dispatch({
        type: 'INPUT_CHANGE',
        value: value, 
        isValid: isValid,
        inputId: id})
  }, []);

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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:4001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: state.title,
          description: state.description,
        })
      });
  
      let responseData = await response.json();
  
  
      console.log(responseData);
      window.location.reload(false);
  
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
