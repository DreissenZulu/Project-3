import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  let currUser = JSON.parse(localStorage.getItem("currUser"));

  function NavOptions() {
    if (currUser !== null) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink exact to="/home" className="nav-link" activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={`/profile/${currUser.id}`} className="nav-link" activeClassName="active">Profile</NavLink>
          </li>
          <li className="nav-item">
            <a href="/home" className="nav-link" onClick={signOut} activeClassName="active">Sign Out</a>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink exact to="/home" className="nav-link" activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" activeClassName="active">Log In</NavLink>
          </li>
        </ul>
      )
    }
  }

  function signOut() {
    localStorage.removeItem("currUser");
    window.location.pathname = "/home";
  }

  return (
    <Navbar sticky="top" bg="info" variant="dark" expand="md">
      <Link to="/home" className="navbar-brand">YuMi Jobs</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <NavOptions />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;