import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

const Dummy_Expenses = [
    {
        id: "1",
        description: "A pair of shoes",
        amount: 59.99,
        date: new Date("2024-03-15")
    },
    {
        id: "2",
        description: "A pair of T-Shirts",
        amount: 25.99,
        date: new Date("2023-11-15")
    },
    {
        id: "3",
        description: "Some books",
        amount: 83.99,
        date: new Date("2023-11-15")
    },
    {
        id: "4",
        description: "Some books",
        amount: 83.99,
        date: new Date("2023-11-15")
    },
    {
        id: "5",
        description: "Some books",
        amount: 83.99,
        date: new Date("2023-11-15")
    },
    {
        id: "6",
        description: "Some books",
        amount: 83.99,
        date: new Date("2023-11-15")
    },
    {
        id: "7",
        description: "Some books",
        amount: 83.99,
        date: new Date("2023-10-30")
    },
    {
        id: "8",
        description: "Some books",
        amount: 83.99,
        date: new Date("2023-02-28")
    },
    {
        id: "9",
        description: "Some books",
        amount: 3.99,
        date: new Date("2023-08-19")
    },
]


const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary  
      expenses={Dummy_Expenses}
      periodName={expensesPeriod}/>
      <ExpensesList expenses={Dummy_Expenses}/>
    </View>
  );
};

export default ExpensesOutput;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    }
})
