import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "./Navbar.scss";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="transparent" expand="lg">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="text-white"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="text-white fw-bold ">
          <Nav className="mx-auto text-white">
            <Link to="/" className="me-5 text-white text-decoration-none p-2">
              Now
            </Link>
            <Link
              to="/hourly-weather"
              className="me-5 text-white  text-decoration-none p-2"
            >
              Hourly
            </Link>
            <Link
              to="/five-day-weather"
              className="me-5 text-white text-decoration-none p-2"
            >
              5-day
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
