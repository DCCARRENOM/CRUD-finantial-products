import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Banner.css'

function Banner () {
    return(
        <Navbar >
        <Container >
          <Navbar.Brand className="Texto">Productos Financieros</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Banner;