import React, { useContext } from 'react';

import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/auth-context';
import Button from '../FormElements/Button';

import './NavLinks.css';


const NavLinks = (props) => {

  const auth = useContext(AuthContext);

  return (
    <ul className="nav-link">
      <li>
        <NavLink to="/" exact>All Users</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn ? (
        <li>
          <Button onClick={auth.logout}>Logout</Button>
        </li>
      ) :
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      }
    </ul>
  );
}

export default NavLinks;
