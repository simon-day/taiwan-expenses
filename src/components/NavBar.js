import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firestore';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useEffect } from 'react';
import { ExpensesContext } from '../context/ExpenseContext';
import { useContext } from 'react';

const auth = firebase.auth();

const NavBar = props => {
  const { state } = useContext(ExpensesContext);

  useEffect(() => {
    const elems = document.querySelectorAll('.side-nav');
    M.Sidenav.init(elems);
  });

  const logOut = async () => {
    const response = await auth.signOut();
    console.log(response);
    // props.history.push('/login');
  };

  return (
    <nav>
      <div className="nav nav-wrapper">
        <span className="brand-logo center">TAIWAN Expenses</span>
        <ul id="nav-mobile" className="right">
          {state.userId && (
            <Link className="sign-out-button" onClick={logOut} to="/">
              Sign Out
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
