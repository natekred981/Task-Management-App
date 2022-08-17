import React, { useState, useCallback, useReducer, useContext } from "react";
import Button from "../../shared/components/UiElements/Button";
import Input from "../../shared/components/UiElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import "./CreateTask.css";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import { useHistory } from "react-router-dom";




const CreateTask = (props) => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
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
  
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`, 
          'POST',
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            creator: auth.userId
          }),
          new Headers({
            'Authorization': 'bearer ' + auth.token, 
            'Content-Type': 'application/json'
        })
        );
        history.push(`/${auth.userId}/tasks`);
    }
    
    //redirect user to different page
    catch (err) {};
    
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form-box' onSubmit={handleSubmit}>
        {isLoading && <LoadingSpinner asOverlay/>}
          <Input 
            id="title"
            element="input"
            type="text"
            label="Title" 
            errorText="Please enter a valid title" 
            validators={[VALIDATOR_REQUIRE()]} 
            onInput={inputHandler}
            />
          <Input 
            id="description"
            label="Description"
            element="textarea"
            errorText="Please enter a valid description (at least 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            />
          <Button type="submit">
            ADD TASK
          </Button>
      </form>
      </React.Fragment>
  );
};

export default CreateTask;
