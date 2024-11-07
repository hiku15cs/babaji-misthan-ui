import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // To wrap Link with Bootstrap styling

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Babaji Misthan Bhandar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/milkman-details">
              <Nav.Link>Milkman</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/milkEntry">
              <Nav.Link>Milk Entry</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/payments">
              <Nav.Link>Payments</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
