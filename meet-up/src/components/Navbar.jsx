import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-dot"></span>
          MeetupHub
        </Link>
        <div className="navbar-right">
          <Link to="/" className="nav-link">Events</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;