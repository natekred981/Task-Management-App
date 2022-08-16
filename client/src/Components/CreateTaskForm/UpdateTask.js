import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../shared/components/UiElements/Button";
import Card from "../../shared/components/UiElements/Card";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import Input from "../../shared/components/UiElements/Input";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import './CreateTask.css';
import { AuthContext } from "../../shared/context/auth-context";



const UpdateTask = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedTask, setLoadedTask] = useState();
    const taskId = useParams().taskId;
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

    const history = useHistory()
    const updateSubmitHandler = async e => {
        e.preventDefault();
        try {
            await sendRequest(`http://localhost:4001/api/tasks/${taskId}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value
            }),
            new Headers({
                'Authorization': 'bearer ' + auth.token, 
                'Content-Type': 'application/json'
            })
            
            )
            history.push(`/${auth.userId}/tasks`)
        }
        catch (err){console.log(err)};
        
    };

    useEffect(() => {
        const fetchTask = async() => {
            try{
                const responseData = await sendRequest
                        (`http://localhost:4001/api/tasks/user/${taskId}`); 
                console.log(responseData.task.title);
                setLoadedTask(responseData.task);
                setFormData({
                    title: {
                        value: responseData.task.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.task.description,
                        isValid: true
                    }
                }, true);
            }
            
            catch (err) {
                console.log("not working");
            }
            
        };
        fetchTask();
    }, [sendRequest, taskId, setFormData]);

    if (isLoading){
        return <div className="center">
            <LoadingSpinner />
        </div>
    }
    
    if (!loadedTask && !error){
        return (
            <div className="center">
                <Card>
                    <h2>Could not find task!</h2>
                </Card>
            </div>
        )
    }
    

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedTask && ( <form className="form-box" onSubmit={updateSubmitHandler}>
        <Input 
            id="title" 
            element="input" 
            type="text" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="please enter a valid title"
            onInput={inputHandler}
            value={loadedTask.title}
            valid={true}
        />

        <Input 
            id="description" 
            element="textarea" 
            type="text" 
            label="Description" 
            validators={[VALIDATOR_MINLENGTH(5)]} 
            errorText="please enter a valid description (min of 5 characters)"
            onInput={inputHandler}
            value={loadedTask.description}
            valid={true}
        />
<Button type="submit" disabled={!formState.isValid} >
    UPDATE PLACE
</Button>
    </form> )}
    </React.Fragment>
};

export default UpdateTask;