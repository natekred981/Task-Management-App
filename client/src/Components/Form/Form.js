import React, { useState } from "react";
import Button from "../../shared/components/Button";
import Description from "./Components/Desription";
import Select from "./Components/Select";
import Title from "./Components/Title";
import "./Form.css";

const CreateTask = () => {
  return (
    <>
      <div className="form-box">
        <h1>Task Details</h1>
        <form>

          <Title />

            <Select />
            <Description />
            <Button />


        </form>
      </div>
    </>
  );
};

export default CreateTask;
