import React from "react";
import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const Dummy_Expenses = [
    {
        id: "1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("01-01-2024")
    },
    {
        id: "2",
        description: "A pair of T-Shirts",
        amount: 25.99,
        date: new Date("15-11-2023")
    },
    {
        id: "3",
        description: "Some books",
        amount: 83.99,
        date: new Date("04-12-2023")
    },
]


const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary  
      expenses={expenses}
      periodName={expensesPeriod}/>
      <ExpensesList />
    </View>
  );
};

export default ExpensesOutput;
