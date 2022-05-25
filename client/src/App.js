import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from "./Components/Dashboard/HomePage.js";
import CreateTask from "./Components/CreateTaskForm/Form.js";
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
          <Route exact path="/u1">
            <CreateTask />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}


export default App;