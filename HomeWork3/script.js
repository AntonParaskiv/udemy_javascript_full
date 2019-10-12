"use strict";

let money, time;

function start() {
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?");
  }
  time = prompt("Введите дату в формате YYYY-MM-DD");
}

start();

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: undefined,
  income: [],
  savings: true
};

function chooseExpenses() {
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
}
chooseExpenses();

function chooseOptExpenses() {
  let optionalExpenses = [];
  for (let i = 0; i < 3; i++) {
    let expense = prompt("Статья необязательных расходов?", "");

    if (expense != null && expense != "" && expense.length < 50) {
      optionalExpenses[i] = expense;
    } else {
      i--;
    }
  }
  appData.optionalExpenses = optionalExpenses;
}
chooseOptExpenses();

function detectDayBudget() {
  appData.MoneyPerDay = (appData.budget / 30).toFixed(1);
  alert("Ваш бюджет в день: " + appData.MoneyPerDay + " рублей");
}
detectDayBudget();

function detectLevel() {
  if (appData.MoneyPerDay < 100) {
    console.log("Минимальный уровень достатка");
  } else if (appData.MoneyPerDay > 100 && appData.MoneyPerDay < 2000) {
    console.log("Средний уровень достатка");
  } else if (appData.MoneyPerDay > 2000) {
    console.log("Высокий уровень достатка");
  } else {
    console.log("Произошла ошибка");
  }
}
detectLevel();

function checkSavings() {
  if (appData.savings) {
    let save = +prompt("Какая сумма накоплений?", "");
    let percent = +prompt("Под какой процент?", "");

    appData.monthIncome = (save * percent) / 100 / 12;
    alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
  }
}

checkSavings();
