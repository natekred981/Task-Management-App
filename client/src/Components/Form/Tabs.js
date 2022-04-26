import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Form.js";


const ControlledTabs = () => {
    const [key, setKey] = useState('dashboard');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="dashboard" title="Dashboard">
          Here it 
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