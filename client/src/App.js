import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import CreateTask from "./Components/Form/Form.js";
import UpdateTask from "./Components/Form/UpdateTask.js";
import ControlledTabs from "./Components/Tabs.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";

function App() {
  return (
    <>
      <Router>
      <MainNavigation />
        <Switch>
          <Route exact path="/new/task">
              <CreateTask />
          </Route>
          <Route exact path="/:taskId">
            <UpdateTask />
          </Route>
          <Route exact path="/">
            <ControlledTabs />
          </Route>
          
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}


export default App;