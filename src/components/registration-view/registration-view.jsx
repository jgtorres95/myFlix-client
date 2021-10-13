import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';
import axios from 'axios';

import { Link } from "react-router-dom";

// create RegistrationView component
export function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    const isValidated = formValidation();
    if (isValidated) {
      axios.post('https://cf-myflix-app.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self')
        })
        .catch(e => {
          console.log('error registering user')
        });
    };
  }

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let isValidated = true;


    if (username === '') {
      usernameError.usernameEmpty = 'Username is required'
      isValidated = false;
    }

    if (password === '') {
      passwordError.passwordEmpty = 'Password is required'
      isValidated = false;
    }

    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotValid = 'Email address is not valid';
      isValidated = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValidated;
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} required />
        {Object.keys(usernameError).map((key) => {
          return (
            <div key={key}>
              {usernameError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
        {Object.keys(passwordError).map((key) => {
          return (
            <div key={key}>
              {passwordError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
        {Object.keys(emailError).map((key) => {
          return (
            <div key={key}>
              {emailError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday: </Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button className="login-button" variant="dark" type="submit" onClick={handleRegistration}>
        Submit
      </Button>
      <Link to={`/`}>
        <Button className="update-button" variant="dark">
          Cancel
        </Button>
      </Link>
    </Form >
  );
}

//RegistrationView.propTypes = {
  //setRegStatus: PropTypes.func.isRequired
//};
