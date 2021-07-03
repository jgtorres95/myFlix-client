import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios.post('https://cf-myflix-app.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
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
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="text" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
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
};