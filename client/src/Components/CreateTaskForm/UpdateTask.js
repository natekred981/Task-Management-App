import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/UiElements/Button";
import Input from "../../shared/components/UiElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";

const Practice = [{
    id: 'p1',
    title: 'blank',
    description: 'here is a description'
}]

const UpdateTask = () => {
    const taskId = useParams().taskId;

    const identifiedTask = Practice.find(i => i.id === taskId);

    if (!identifiedTask) {
        return (
            <div className="center">
                <h2>Could not find task</h2>
            </div>
        );
    }

    return <form>
        <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="please enter a valid title"
            onInput={() => {}}
            value={identifiedTask.title} 
            valid={true}
        />

<Input 
            id="description" 
            element="textarea" 
            type="text" 
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="please enter a valid description (min of 5 characters)"
            onInput={() => {}}
            value={identifiedTask.description} 
            valid={true}
        />
<Button type="submit">
    UPDATE PLACE
</Button>
    </form>

};

export default UpdateTask;