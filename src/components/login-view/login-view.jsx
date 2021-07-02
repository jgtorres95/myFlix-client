import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    props.onLoggedIn(username);
  };

  const onRegister = () => {
    let newRegStatus = true;
    console.log(newRegStatus);
    props.setRegStatus(newRegStatus);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      <Button className="login-button" variant="primary" type="submit" onClick={handleSubmit}>
        Log In
      </Button>
      <Button className="login-button" variant="secondary" type="link" onClick={onRegister}>
        Register
      </Button>
    </Form >
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  setRegStatus: PropTypes.func.isRequired
