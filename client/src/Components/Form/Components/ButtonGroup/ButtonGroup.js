import React from "react";
import CreateButton from "../../../../shared/components/CreateButton";
import styled from 'styled-components';
import SubmitButton from "./SubmitButton";

const ButtonGroup = styled.div`
    display: flex
`;

const Buttons = (props) => {
    <ButtonGroup>
        <CreateButton />
        <SubmitButton />
        
    </ButtonGroup>
}

export default Buttons;