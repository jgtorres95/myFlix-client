import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './navbar-view.scss';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class NavBarView extends React.Component {

  handleSignOut() {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user, onBackClick } = this.props;
    const profile = '/users/${user}';

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>myFlix</Navbar.Brand>
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
