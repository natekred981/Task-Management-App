import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from "./Components/Dashboard/HomePage.js";
import CreateTask from "./Components/CreateTaskForm/CreateTask.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation.js";
import UpdateTask from "./Components/CreateTaskForm/UpdateTask.js";
import Auth from "./Components/Authorization/Auth.js";
import { AuthContext } from "./shared/context/auth-context.js";
import useAuth from "./shared/hooks/auth-hook.js";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token){
      routes = (
        <Switch>
            <Route path="/:userId/tasks" exact>
              <HomePage />
            </Route>
            <Route exact path="/:userId/create/task">
              <CreateTask />
            </Route>
            <Route path="/update/:taskId">
              <UpdateTask />
            </Route>
            <Redirect to={`/`} />
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
    <AuthContext.Provider value=
    {{isLoggedIn: !!token,
      token: token,
     userId: userId, 
     login: login, 
     logout: logout }}>
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