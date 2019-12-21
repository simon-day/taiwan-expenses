import React, { useEffect, useState } from 'react';
import firebase from '../Firestore';
import { ExpensesContext } from '../context/ExpenseContext';

const useExpenses = userId => {
  const [fetchedExpenses, setFetchedExpenses] = useState([]);

  console.log('userId in useExpenses: ', userId);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('expenses')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        const newExpenses = snapshot.docs.map(doc => ({ ...doc.data() }));

        setFetchedExpenses(newExpenses);
      });
    return () => unsubscribe();
  }, []);

  return fetchedExpenses;
};

export default useExpenses;
