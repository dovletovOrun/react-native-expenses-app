import React from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'

const RecentExpense = () => {
  return (
    <ExpensesOutput expensesPeriod="Last 7 days"/>
  )
}

export default RecentExpense