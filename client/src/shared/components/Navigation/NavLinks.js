import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);
  return <ul className="nav-links">
    {auth.isLoggedIn && (<li>
      <NavLink to={`/${auth.userId}/tasks`} exact>ALL TASKS</NavLink>
    </li>)}
    
      {auth.isLoggedIn && (
      <li>
        <NavLink to={`/${auth.userId}/create/task`} >CREATE TASK</NavLink>
    </li>
        )}
    {!auth.isLoggedIn && (
      <li>
      <NavLink to="/auth">LOGIN/SIGNUP</NavLink>
      </li>
    )}  
    {auth.isLoggedIn &&
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
    }  
  </ul>
};

export default NavLinks;