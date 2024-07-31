import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id);
        const updatableExpense = state[updatableExpenseIndex];
        const updateItem = { ...updatableExpense, ...action.payload.data}
        const updatedExpenses = [...state];
        updatedExpenses[updatableExpenseIndex] = updateItem 
        return updatedExpenses
    case "DELETE":
        return state.filter((expense) => expense.id !== action.payload)

    default:
      return state;
  }
};
const Dummy_Expenses = [
  {
    id: "1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-03-15"),
  },
  {
    id: "2",
    description: "A pair of T-Shirts",
    amount: 25.99,
    date: new Date("2023-11-15"),
  },
  {
    id: "3",
    description: "Some books",
    amount: 83.99,
    date: new Date("2023-11-15"),
  },
];

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, Dummy_Expenses);

  const addExpense = ({ expenseData }) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
