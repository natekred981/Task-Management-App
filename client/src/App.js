import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from "./Components/Dashboard/HomePage.js";
import CreateTask from "./Components/CreateTaskForm/Form.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import UpdateTask from "./Components/CreateTaskForm/UpdateTask.js";
import Auth from "./Components/Authorization/Auth.js";
import { AuthContext } from "./shared/context/auth-context.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() =>{
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn){
    routes = (
      <Switch>
          <Route exact path="/u1">
            <CreateTask />
          </Route>
          <Route path="/update/:taskId">
            <UpdateTask />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Redirect to="/" />
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
      <Route path="/">
            <Auth />
          </Route>
      <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation />  
        <main> 
          {routes}
        </main>   
      </Router>
      </AuthContext.Provider>
  );
}


export default App;