import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

const RecentExpense = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext);


  useEffect(() => {
    const fetchExpenses = async () => {
      setIsFetching(true)
      try{
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError("Could not fetch expenses")
      }
      setIsFetching(false)
    };
    fetchExpenses();
  }, []);

  const errorHandler = () => {
    setError(null)
  }

  if (error && !isFetching) {
    return <Error message={error} />
  }

  if (isFetching) {
    return <Loading/>
  }
  const recentExpenses = expensesCtx.expenses?.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpense;
