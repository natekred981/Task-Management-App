import React, { useState } from "react";
import Button from "react-bootstrap/Button";



const CreateTask = () => {
    const [type, setType] = useState("excercise")
    const handleChange = (e =>  {setType(e.target.value); console.log(type)});
    return (
        <>
            <div className="form-box">
                <h5>Task Details</h5>
                <form>
                    <div className="field1">
                        <input placeholder="Title"></input>
                        <div></div>
                        <label> What type of task?
                            <select 
                                id="task-type"
                                value={type}
                                onChange={handleChange}
                            >
                                <option value="excercise">Excercise</option>
                                <option value="study time">Study Time</option>
                                <option value="cooking">Coconut</option>
                                <option value="grocery shopping">Grocery Shopping</option>
                                <option value="reading">Reading</option>
                                <option value="tv time">TV Time</option>
                                <option value="social time">Social Time</option>
                                <option value="other">Other</option>
                            </select>
                            
                        </label>
                        <textarea placeholder="task description" rows="5" cols="40"></textarea>
                        <Button type="submit">submit task</Button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default CreateTask;