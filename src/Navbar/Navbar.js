import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import "./Navbar.scss";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "bootstrap";

function NavBar() {
  return (
    <Navbar bg="transparent"  expand="lg">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="text-white"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="text-white">
          <Nav className="mx-auto text-white">
            <Nav.Link href="#home" className="me-5 text-white">
              Now
            </Nav.Link>
            <Nav.Link href="#link" className="me-5 text-white">
              Hourly
            </Nav.Link>
            <Nav.Link href="#link" className="text-white">
              5-day
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
