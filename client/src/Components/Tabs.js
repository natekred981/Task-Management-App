import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTask from "./Form/Form.js";
import TaskList from "./Dashboard/Tasks.js";


const ControlledTabs = () => {
    const [key, setKey] = useState('dashboard');
    const tasks = [{
        title: 'first post',
        option: 'news',
        description: 'fornfr roinfrnqw iqrfifrmio qfrnrjonfqr nkrjf nr norifnmrenf jrnq3fo'
    },
  {
    title: 'second post',
    option: 'leisure',
    description: 'fornfr roinfrnqw iqrfifrmio qfrnrjonfqr nkrjf nr norifnmrenf jrnq3fo'
  }];

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="dashboard" title="Dashboard">
          <TaskList items={tasks}/>
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