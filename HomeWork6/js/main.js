// Начать расчет
let startBtn = document.querySelector("#start");

// values
let budgetValue = document.querySelector(".budget-value"),
  dayBudgetValue = document.querySelector(".daybudget-value"),
  expensesValue = document.querySelector(".expenses-value"),
  optionalExpensesValue = document.querySelector(".optionalexpenses-value"),
  incomeValue = document.querySelector(".income-value"),
  monthSavingsValue = document.querySelector(".monthsavings-value"),
  yearSavingsValue = document.querySelector(".yearsavings-value");

// input expenses-item
let expensesItems = document.querySelectorAll(".expenses-item");

// buttons
let btns = document.getElementsByTagName("button"),
  accept1 = btns[0],
  accept2 = btns[1],
  calc = btns[2];

// input optionalexpenses-item
let optionalExpensesItems = document.querySelectorAll(".optionalexpenses-item");

let chooseIncome = document.querySelector("#income");
let savings = document.querySelector("#savings");
let sum = document.querySelector("#sum");
let percent = document.querySelector("#percent");

let yearValue = document.querySelector(".year-value");
let monthValue = document.querySelector(".month-value");
let dayValue = document.querySelector(".day-value");
