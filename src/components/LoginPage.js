import React, { useState } from 'react';
import firebase from '../Firestore';
import { useHistory } from 'react-router-dom';
import { TextInput, Button } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useEffect } from 'react';

const auth = firebase.auth();

const LoginPage = () => {
  let history = useHistory();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    return () => setDidMount(false);
  }, []);

  const closeModal = modalId => {
    const modal = document.querySelector(modalId);
    M.Modal.getInstance(modal).close();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUpSubmit = async e => {
    e.preventDefault();
    // Send to Firebase
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError('');
      history.push('/expenses');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogInSubmit = async e => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setError('');
      history.push('/expenses');
    } catch (error) {
      setError('Problem logging in, please try again');
    }
    // closeModal('#log-in-modal');
  };

  return (
    <div className="landing-page-container">
      <h3>Welcome to Expenses</h3>
      <p>
        Login or create an account to manage and track all your outgoing
        expenses
      </p>

      <a
        className="waves-effect waves-light btn modal-trigger"
        href="#log-in-modal"
      >
        Login
      </a>
      <a
        className="waves-effect waves-light btn btn-sign-up modal-trigger"
        href="#sign-up-modal"
      >
        Sign Up
      </a>

      <div id="sign-up-modal" className="modal">
        <div className="modal-content">
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
            {error && <p className="error-message">{error}</p>}
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
      </div>

      <div id="log-in-modal" className="modal">
        <div className="modal-content">
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
            {error && <p className="error-message">{error}</p>}
            <Button type="submit">Log In</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
