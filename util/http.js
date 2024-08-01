import axios from "axios";

const url = "https://react-native-9bb27-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const res = await axios.post(url + "/expenses.json", expenseData);
  const id = res.data.name;
  return id;
};

export const getExpenses = async () => {
  const res = await axios.get(url + "/expenses.json");

  const expenses = [];

  for (const key in res.data) {
    const expenseObj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
};

export const updateExpense = (id, expenseData) => {
    return axios.put(url + `/expenses/${id}.json`, expenseData)
}

export const deleteExpense = (id) => {
   return axios.delete(url + `/expenses/${id}.json`)
}
