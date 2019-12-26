// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, { useEffect } from 'react';
import { ExpensesContext } from './context/ExpenseContext';
import { Redirect, Route } from 'react-router-dom';
import { useContext } from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(ExpensesContext);

  // Add your own authentication on the below line.
  const isLoggedIn = state.userId ? true : false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
