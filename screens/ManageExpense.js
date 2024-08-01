import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses?.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try it again!");
      isLoading(false);
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save the data - please try it again!");
      setIsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <Error message={error}  />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonProp={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
