import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegistration(username);
  };
