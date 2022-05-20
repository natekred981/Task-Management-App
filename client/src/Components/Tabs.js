import {Tab, Tabs } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Form/Form.js";
import TaskList from "./Dashboard/Tasks.js";
import CreateButton from "../shared/components/CreateButton.js";
import Modal from "./Form/Modal.js";


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
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:4001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: state.title,
          option: state.option,
          description: state.description,
          creator: '4'
        })
      });
  
      let responseData = await response.json();
  
  
      console.log(responseData);
      window.location.reload(false);
  
    }

    const schemaNames = ["title", "option", "description"];
    const [state, setState] = useState(
      {
        [schemaNames[0]]: "",
        [schemaNames[1]]: "excercise",
        [schemaNames[2]]: ""
      }
    );
    const handleChange = (e) => {
      const { name, value } = e.target;
      setState(prevState => ({
         ...prevState,
         [name]: value
      })); 
    };


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
        <Tab eventKey="task" title="Create Task">
        
        </Tab>
        <Tab eventKey='a' title='A'>
          <Modal show={showForm} onSubmit={handleSubmit} onCancel={() => setShowForm(false)}/>
        </Tab>
      </Tabs>
      </>
    );
  }
export default ControlledTabs;