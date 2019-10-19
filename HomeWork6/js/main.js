let startBtn = document.querySelector("#start"),
  budgetValue = document.querySelector(".budget-value"),
  dayBudgetValue = document.querySelector(".daybudget-value"),
  levelValue = document.querySelector(".level-value"),
  expensesValue = document.querySelector(".expenses-value"),
  optionalExpensesValue = document.querySelector(".optionalexpenses-value"),
  incomeValue = document.querySelector(".income-value"),
  monthSavingsValue = document.querySelector(".monthsavings-value"),
  yearSavingsValue = document.querySelector(".yearsavings-value"),
  expensesItems = document.querySelectorAll(".expenses-item"),
  expensesBtn = document.getElementsByTagName("button")[0],
  optionalExpensesBtn = document.getElementsByTagName("button")[1],
  countBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItems = document.querySelectorAll(".optionalexpenses-item"),
  incomeItem = document.querySelector("#income"),
  checkSavings = document.querySelector("#savings"),
  sumValue = document.querySelector("#sum"),
  percentValue = document.querySelector("#percent"),
  yearValue = document.querySelector(".year-value"),
  monthValue = document.querySelector(".month-value"),
  dayValue = document.querySelector(".day-value");

let money, time;

startBtn.addEventListener("click", function() {
  time = prompt("Введите дату в формате YYYY-MM-DD");
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear();
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate();

  changeProgramActive(true);
});

expensesBtn.addEventListener("click", function() {
  for (let i = 0; i < expensesItems.length; i++) {
    let expenseKey = expensesItems[i].value;
    let cost = expensesItems[++i].value;

    if (
      expenseKey != null &&
      cost != null &&
      expenseKey != "" &&
      cost != "" &&
      expenseKey.length < 50
    ) {
      appData.expenses[expenseKey] = cost;

      appData.expensesSum += +cost;
    } else {
      i--;
    }
  }
  expensesValue.textContent = appData.expensesSum;
});

optionalExpensesBtn.addEventListener("click", function() {
  // let optionalExpenses = [];
  let opt;
  for (let i = 0; i < optionalExpensesItems.length; i++) {
    opt = optionalExpensesItems[i].value;
    appData.optionalExpenses[i] = opt;
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
  }
});

countBtn.addEventListener("click", function() {
  if (appData.budget != undefined) {
    appData.MoneyPerDay = ((appData.budget - appData.expensesSum) / 30).toFixed(
      1
    );
    dayBudgetValue.textContent = appData.MoneyPerDay;

    if (appData.MoneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.MoneyPerDay > 100 && appData.MoneyPerDay < 2000) {
      levelValue.textContent = "Средний уровень достатка";
    } else if (appData.MoneyPerDay > 2000) {
      levelValue.textContent = "Высокий уровень достатка";
    } else {
      levelValue.textContent = "Произошла ошибка";
    }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка";
  }
});

incomeItem.addEventListener("change", function() {
  let items = incomeItem.value;
  appData.income = items.split(", ");
  incomeValue.textContent = appData.income;
});

checkSavings.addEventListener("click", function() {
  appData.savings = !appData.savings;
});

sumValue.addEventListener("input", calcSavings);
percentValue.addEventListener("input", calcSavings);

function calcSavings() {
  if (
    appData.savings == true &&
    sumValue.value != "" &&
    percentValue.value != ""
  ) {
    appData.yearIncome = (+sumValue.value * +percentValue.value) / 100;
    appData.monthIncome = appData.yearIncome / 12;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  }
}

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  expensesSum: 0,
  optionalExpenses: [],
  income: [],
  savings: false
};

changeProgramActive(false);
function changeProgramActive(isActive) {
  if (isActive) {
    expensesBtn.style.visibility = "";
    optionalExpensesBtn.style.visibility = "";
    countBtn.style.visibility = "";
  } else {
    expensesBtn.style.visibility = "hidden";
    optionalExpensesBtn.style.visibility = "hidden";
    countBtn.style.visibility = "hidden";
  }
}
