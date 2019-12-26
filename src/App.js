import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { ExpensesContext } from './context/ExpenseContext';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import ExpenseDasboard from './components/ExpenseDashboard';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import PrivateRoute from './PrivateRoute';
import { useEffect } from 'react';
import firebase from './Firestore';

const auth = firebase.auth();

function App() {
  const { state, setState } = useContext(ExpensesContext);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    auth.onAuthStateChanged(user => {
      if (user) {
        setState(s => ({ ...s, userId: user.uid }));
      } else {
        setState(s => ({ ...s, userId: '' }));
      }
    });
    return () => setDidMount(false);
  }, [state.userId]);

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <PrivateRoute path="/expenses" component={ExpenseDasboard} />
          <Route exact path="/expenses" component={ExpenseDasboard} />
          {state.userId && <Redirect to="/expenses" />}
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
