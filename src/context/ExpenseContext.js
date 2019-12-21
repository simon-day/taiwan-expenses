import React, { createContext, useReducer, useState } from 'react';
import { useEffect } from 'react';
import firebase from '../Firestore';

const SORT_OPTIONS = {
  NEWEST: { column: 'createdAt', direction: 'desc' },
  OLDEST: { column: 'createdAt', direction: 'asc' },
  AMOUNT_ASC: { column: 'amount', direction: 'asc' },
  AMOUNT_DESC: { column: 'amount', direction: 'desc' }
};

const auth = firebase.auth();
const db = firebase.firestore();

const useExpenses = (userId, sortBy = 'NEWEST') => {
  const [fetchedExpenses, setFetchedExpenses] = useState([]);

  console.log('userId in useExpenses: ', userId);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('expenses')
      .where('userId', '==', userId)
      .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
      .onSnapshot(snapshot => {
        const newExpenses = snapshot.docs.map(doc => ({ ...doc.data() }));

        setFetchedExpenses(newExpenses);
      });
    return () => unsubscribe();
  }, [sortBy, userId]);

  return fetchedExpenses;
};

export const ExpensesContext = createContext();

export const ExpenseProvider = props => {
  // const [state, dispatch] = useReducer(
  //   ExpenseReducer,
  //   JSON.parse(localStorage.getItem('state')) || initialState
  // );]

  const initialState = {
    expenses: [],
    filteredExpenses: [],
    currentExpense: '',
    sortBy: 'NEWEST',
    loggedIn: false,
    userId: ''
  };

  // const [userId, setUserId] = useState('');

  const [state, setState] = useState(initialState);

  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     setState({ ...state, userId: user.uid });
  //     // dispatch({ type: 'LOG_IN' });
  //     console.log(user.uid);
  //   } else {
  //     setState({ ...state, userId: '' });
  //     // dispatch({ type: 'LOG_OUT' });
  //   }
  // });

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setState({ ...state, userId: user.uid });
        // dispatch({ type: 'LOG_IN' });
        console.log(user.uid);
      } else {
        setState({ ...state, userId: '' });
        // dispatch({ type: 'LOG_OUT' });
      }
    });
  }, [state.userId]);

  const expenses = useExpenses(state.userId, state.sortBy);
  console.log('expneses: ', expenses);

  useEffect(() => {
    setState({ ...state, expenses });
  }, [expenses]);

  console.log('initialState: ', initialState);

  // useEffect(() => {
  //   fetchData();
  // }, [userId]);

  // const fetchData = async () => {
  //   const expenses = await db
  //     .collection('expenses')
  //     .where('userId', '==', userId)
  //     .get();
  //   const expensesArr = await expenses.docs
  //     .filter(doc => doc.data().userId === userId)
  //     .map(doc => ({
  //       description: doc.data().description,
  //       amount: doc.data().amount,
  //       createdAt: moment(doc.data().createdAt),
  //       id: doc.id
  //     }));
  //   dispatch({ type: 'FETCH_EXPENSES', expenses: expensesArr });
  //   console.log(expensesArr);
  //   // .then(snapshot => snapshot.docs.map(doc => console.log(doc.data())));
  // };

  // useEffect(() => {
  //   initialState.filteredExpenses = [...initialState.expenses];
  // }, []);

  return (
    <ExpensesContext.Provider value={{ state, setState }}>
      {props.children}
    </ExpensesContext.Provider>
  );
};
