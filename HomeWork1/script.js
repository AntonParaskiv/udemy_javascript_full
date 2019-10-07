"use strict";

let money = prompt("Ваш бюджет на месяц?");
let time = prompt("Введите дату в формате YYYY-MM-DD");

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: undefined,
  income: [],
  savings: false
};

let expense, cost;

expense = prompt("Введите обязательную статью расходов в этом месяце", "");
cost = prompt("Во сколько обойдется?", "");
appData.expenses.expense = cost;

expense = prompt("Введите обязательную статью расходов в этом месяце", "");
cost = prompt("Во сколько обойдется?", "");
appData.expenses.expense = cost;

console.log(appData);
let oneDayBudget = appData.budget / 30;
alert("Ваш бюджет в день: " + oneDayBudget + " рублей");
