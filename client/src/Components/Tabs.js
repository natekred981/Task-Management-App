import {Tab, Tabs } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./Dashboard/Tasks.js";
import CreateButton from "../shared/components/UiElements/CreateButton";


const ControlledTabs = () => {
    const [loadedTasks, setLoadedTasks] = useState();
    useEffect(() => {
      const sendRequest = async () => {
        const response = await fetch('http://localhost:4001/api/tasks');
        const responseData  = await response.json();
        setLoadedTasks(responseData.tasks);
      }
      sendRequest();
    }, [])
    const [key, setKey] = useState('dashboard');
    const [showForm, setShowForm] = useState(false);

    
    
    
    


    return (
      <>
      <header>
        <CreateButton onClick={() => setShowForm(true)}/>
      </header>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="dashboard" title="Dashboard">
          {loadedTasks && <TaskList items={loadedTasks} />}
          {!loadedTasks && <h1>No ongoing tasks</h1>}
        </Tab>
      </Tabs>
      </>
    );
  }
export default ControlledTabs;