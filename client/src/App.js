import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import ControlledTabs from "./Components/Tabs.js";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/forms">
            Blank
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