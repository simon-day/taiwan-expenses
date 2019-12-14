import React, { useState } from 'react';
import firebase from '../Firestore';
import { TextInput, Button } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useEffect } from 'react';

const db = firebase.firestore();
const auth = firebase.auth();

const LoginPage = () => {
  useEffect(() => {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  }, []);

  const closeModal = modalId => {
    const modal = document.querySelector(modalId);
    M.Modal.getInstance(modal).close();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpSubmit = async e => {
    e.preventDefault();
    // Send to Firebase
    const cred = await auth.createUserWithEmailAndPassword(email, password);

    //Clear form and close modal
    closeModal('#sign-up-modal');
    setEmail('');
    setPassword('');
  };

  const handleLogInSubmit = async e => {
    e.preventDefault();
    const cred = await auth.signInWithEmailAndPassword(email, password);
    console.log(cred);
    closeModal('#log-in-modal');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="landing-page-container">
      <h3>Welcome to Expenses</h3>
      <p>
        Login or create an account to manage and track all your outgoing
        expenses
      </p>
      <a
        class="waves-effect waves-light btn modal-trigger"
        href="#log-in-modal"
      >
        Login
      </a>
      <a
        class="waves-effect waves-light btn btn-sign-up modal-trigger"
        href="#sign-up-modal"
      >
        Sign Up
      </a>

      <div id="sign-up-modal" className="modal">
        <div class="modal-content">
          <h4>Create Account</h4>
          <form onSubmit={handleSignUpSubmit}>
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
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
      </div>

      <div id="log-in-modal" className="modal">
        <div class="modal-content">
          <h4>Log In</h4>
          <form onSubmit={handleLogInSubmit}>
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
            <Button type="submit">Log In</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
