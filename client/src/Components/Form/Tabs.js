import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const ControlledTabs = () => {
    const [key, setKey] = useState('home');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          Here it is
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Lets go
        </Tab>
        <Tab eventKey="contact" title="Contact">
          Yessir
        </Tab>
      </Tabs>
    );
  }
export default ControlledTabs;