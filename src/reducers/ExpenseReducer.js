import uuid from 'uuid';
import moment from 'moment';
import firebase from '../Firestore';

const db = firebase.firestore();

export default (state, action) => {
  switch (action.type) {
    case 'FETCH_EXPENSES':
      return {
        ...state,
        expenses: action.expenses,
        filteredExpenses: action.expenses
      };
    case 'ADD_EXPENSE':
      const time = moment();
      const expense = {
        id: uuid(),
        userId: action.userId,
        description: action.description,
        amount: action.amount,
        createdAt: time.format('YYYY-MM-DD HH:mm:ssZ')
      };

      const addExpense = async () => {
        await db.collection('expenses').add(expense);
      };

      addExpense();

      return {
        ...state,
        expenses: [expense, ...state.expenses]
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.id)
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.id
            ? {
                ...expense,
                amount: action.amount,
                description: action.description
              }
            : expense
        )
      };
    case 'SORT_BY_NEWEST':
      return {
        ...state,
        expenses: state.expenses.sort(
          (a, b) =>
            moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
        ),
        filteredExpenses: state.filteredExpenses.sort(
          (a, b) =>
            moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
        )
      };
    case 'SORT_BY_OLDEST':
      return {
        ...state,
        expenses: state.expenses.sort(
          (a, b) =>
            moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
        ),
        filteredExpenses: state.filteredExpenses.sort(
          (a, b) =>
            moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
        )
      };
    case 'SORT_BY_AMOUNT_HIGHEST':
      return {
        ...state,
        expenses: state.expenses.sort((a, b) => b.amount - a.amount),
        filteredExpenses: state.filteredExpenses.sort(
          (a, b) => b.amount - a.amount
        )
      };
    case 'SORT_BY_AMOUNT_LOWEST':
      return {
        ...state,
        expenses: state.expenses.sort((a, b) => a.amount - b.amount),
        filteredExpenses: state.filteredExpenses.sort(
          (a, b) => a.amount - b.amount
        )
      };
    case 'FILTER_BY_DATE':
      const filteredExpenses = [...state.expenses].filter(
        expense =>
          moment(expense.createdAt).valueOf() >
            moment(action.startDate).valueOf() &&
          moment(expense.createdAt).valueOf() < moment(action.endDate).valueOf()
      );
      return {
        ...state,
        filteredExpenses
      };
    case 'SET_CURRENT_EXPENSE':
      return {
        ...state,
        currentExpense: state.expenses.find(expense => expense.id === action.id)
      };
    case 'RESET_CURRENT_EXPENSE':
      return {
        ...state,
        currentExpense: ''
      };
    default:
      return state;
  }
};
