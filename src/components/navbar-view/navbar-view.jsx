import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './navbar-view.scss';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

// create NavBarView component
export class NavBarView extends React.Component {

  // sign out user by clearing local storage
  handleSignOut() {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const username = localStorage.getItem("user");
    const home = '/';
    const profile = `/users/${username}`;


    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to={home}>
            <Navbar.Brand>myFlix</Navbar.Brand>
          </LinkContainer>
          <Nav.Item>
            <Nav.Link as={Link} to={home}>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={profile}>Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Button onClick={() => { this.handleSignOut() }}>Sign Out</Button>
          </Nav.Item>
        </Container>
      </Navbar>
    );
  }
}
