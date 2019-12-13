import React, { useState } from 'react';
import firebase from '../Firestore';
import { TextInput, Button } from 'react-materialize';
import { database } from 'firebase';

const db = firebase.firestore();

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // db.settings({
    //   timestampsInSnapshots: true
    // });
    // db.collection('users').add({
    //   name,
    //   email
    // });

    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        onChange={e => setName(e.target.value)}
        value={name}
        type="text"
        name="name"
        placeholder="Name"
      />
      <TextInput
        required
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="email"
        name="email"
        placeholder="Email"
      />
      <TextInput
        required
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        name="password"
        placeholder="Password"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginPage;
