import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import ExpenseDasboard from './components/ExpenseDashboard';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/expenses" component={ExpenseDasboard} />
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
