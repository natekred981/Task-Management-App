import React, { useState } from "react";

import './Description.css';

const Description = (props) => {
    
    return <textarea  name={props.name} placeholder="task description" 
            rows="5" cols="40" 
            onChange={props.onChange} value={props.value} />
}

export default Description;
