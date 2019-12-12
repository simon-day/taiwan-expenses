import React from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import ExpenseDasboard from './components/ExpenseDashboard';
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
      <div className="container">
        <ExpenseProvider>
          <ExpenseDasboard />
        </ExpenseProvider>
      </div>
    </>
  );
}

export default App;
