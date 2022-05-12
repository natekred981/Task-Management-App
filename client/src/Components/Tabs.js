import { Tab, Tabs } from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Form/Form.js";
import TaskList from "./Dashboard/Tasks.js";


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
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="dashboard" title="Dashboard">
          {loadedTasks && <TaskList items={loadedTasks} />}
        </Tab>
        <Tab eventKey="calendar" title="Calendar">
          Yep
        </Tab>
        <Tab eventKey="today" title="Today">
          Lets go
        </Tab>
        <Tab eventKey="this week" title="This Week">
          Yessir
        </Tab>
        <Tab eventKey="task" title="Create Task">
        <CreateTask />
        </Tab>
      </Tabs>
    );
  }
export default ControlledTabs;