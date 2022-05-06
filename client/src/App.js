import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Form from "./components/Form.js";
import Authenticate from "./pages/Authentication.js";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/forms" component={Form} />
          <Route exact path="/" component={Authenticate} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}


export default App;
