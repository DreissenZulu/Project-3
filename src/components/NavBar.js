import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function NavBar(props) {
  console.log(props)
  return (
    <Navbar sticky="top" bg="light" expand="md">
      <Link to="/" className="navbar-brand">Infact</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link" activeClassName="active">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" activeClassName="active">Log In</NavLink>
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;