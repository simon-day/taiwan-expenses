import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import ExpenseDasboard from './components/ExpenseDashboard';
import LoginPage from './components/LoginPage';
import { ExpenseProvider } from './context/ExpenseContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <ExpenseProvider>
            <Route exact path="/" component={LoginPage} />
            <Route path="/expenses" component={ExpenseDasboard} />
          </ExpenseProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
