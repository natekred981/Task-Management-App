import {Tab, Tabs } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./Dashboard/Tasks.js";
import CreateButton from "../shared/components/CreateButton.js";
import Modal from "./Form/Modal.js";


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
        <button>ADD TASK</button>
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
        <Tab eventKey="task" title="Create Task">
        
        </Tab>
        <Tab eventKey='a' title='A'>
          <Modal show={showForm} onCancel={() => setShowForm(false)}/>
          
        </Tab>
      </Tabs>
      </>
    );
  }
export default ControlledTabs;