let menu = document.querySelector(".menu");
let menuItems = menu.querySelectorAll(".menu-item");

// sort menu
menu.insertBefore(menuItems[2], menuItems[1]);

// add 5 element
let menuItem5 = document.createElement("li");
menuItem5.classList.add("menu-item");
menuItem5.textContent = "Пятый пункт";
menu.appendChild(menuItem5);

// change background
document.body.style.background = "url(img/apple_true.jpg)";

// change title
let title = document.getElementById("title");
title.textContent = "Мы продаем только подлинную технику Apple";

// delete adv
let adv = document.querySelector(".adv");
adv.parentElement.removeChild(adv);

// ask question
let answer = prompt("Как вы относитесь к технике Apple?", "");
let promptBlock = document.querySelector("#prompt");
promptBlock.textContent = answer;
