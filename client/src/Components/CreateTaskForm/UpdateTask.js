import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/UiElements/Button";
import Card from "../../shared/components/UiElements/Card";
import Input from "../../shared/components/UiElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import './CreateTask.css';

const Practice = [{
    id: 'p1',
    title: 'blank',
    description: 'here is a description'
}]

const UpdateTask = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, true);

    

    const updateSubmitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);
    };
    const taskId = useParams().taskId;

    const identifiedTask = Practice.find(i => i.id === taskId);

    useEffect(() => {
        if (identifiedTask){
            setFormData({
                title: {
                    value: identifiedTask.title,
                    isValid: true
                },
                description: {
                    value: identifiedTask.description,
                    isValid: true
                }
            }, true);
            setIsLoading(false);
        }
    }, [setFormData, identifiedTask]);

    if (!identifiedTask) {
        return (
            <Card>
            <div className="center">
                <h2>Could not find task</h2>
            </div>
            </Card>
        );
    }

    if (!isLoading){
        return <h1>Hi</h1>
    }

    return <form className="form-box" onSubmit={updateSubmitHandler}>
        <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}
        />

<Input 
            id="description" 
            element="textarea" 
            type="text" 
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="please enter a valid description (min of 5 characters)"
            onInput={inputHandler}
            value={identifiedTask.inputs.description.value} 
            valid={formState.inputs.description.isValid}
        />
<Button type="submit" disabled={!formState.isValid} >
    UPDATE PLACE
</Button>
    </form>

};

export default UpdateTask;