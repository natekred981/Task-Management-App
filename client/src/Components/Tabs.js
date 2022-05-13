import {Tab, Tabs } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Form/Form.js";
import TaskList from "./Dashboard/Tasks.js";
import SubmitButton from "../shared/components/SubmitButton.js";
import CreateButton from "../shared/components/CreateButton.js";


const ControlledTabs = () => {
    const [loadedTasks, setLoadedTasks] = useState();
    useEffect(() => {
      const sendRequest = async () => {
        const response = await fetch('http://localhost:4001/api/tasks/4');
        const responseData  = await response.json();
        setLoadedTasks(responseData.tasks);
      }
      sendRequest();
    }, [])
    const [key, setKey] = useState('dashboard');

    return (
      <>
      <header>
        <CreateButton />
      </header>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="dashboard" title="Dashboard">
          {loadedTasks && <TaskList items={loadedTasks} />}
        </Tab>
        <Tab eventKey="task" title="Create Task">
        <CreateTask />
        </Tab>
      </Tabs>
      </>
    );
  }
export default ControlledTabs;