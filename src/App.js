import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import ExpenseDasboard from './components/ExpenseDashboard';
import LoginPage from './components/LoginPage';
import { ExpenseProvider } from './context/ExpenseContext';
import { Navbar } from 'react-materialize';

function App() {
  return (
    <>
      <Navbar
        className="nav"
        brand={<span className=" logo">Taiwan Expenses</span>}
        centerLogo
      ></Navbar>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/expenses">
            <div className="container">
              <ExpenseProvider>
                <ExpenseDasboard />
              </ExpenseProvider>
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
