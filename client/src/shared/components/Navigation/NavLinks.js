import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL TASKS</NavLink>
    </li>
    <li>
      <NavLink to="/u1">CREATE TASK</NavLink>
    </li>
    <li>
      <NavLink to="/auth">LOGIN/SIGNUP</NavLink>
    </li>
  </ul>
};

export default NavLinks;