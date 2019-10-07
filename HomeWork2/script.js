"use strict";

let money = +prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: undefined,
  income: [],
  savings: false
};

for (let i = 0; i < 2; i++) {
  let expenseKey = prompt(
    "Введите обязательную статью расходов в этом месяце",
    ""
  );
  let cost = +prompt("Во сколько обойдется?", "");

  if (
    expenseKey != null &&
    cost != null &&
    expenseKey != "" &&
    cost != "" &&
    expenseKey.length < 50
  ) {
    appData.expenses[expenseKey] = cost;
  } else {
    i--;
  }
}

console.log(appData);
let oneDayBudget = appData.budget / 30;
alert("Ваш бюджет в день: " + oneDayBudget + " рублей");
