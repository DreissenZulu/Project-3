import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar sticky="top" bg="light" expand="md">
      <Link to="/" className="navbar-brand">Infact</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Log In</Link>
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;