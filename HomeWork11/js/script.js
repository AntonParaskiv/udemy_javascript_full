"use strict";

const SelectorOverlay = ".overlay";
const SelectorClose = ".popup-close";
const SelectorMoreButtons = ".more, .description-btn";
const SelectorTabs = ".info-header-tab";
const SelectorInfo = ".info-header";
const SelectorTabContent = ".info-tabcontent";

window.addEventListener("DOMContentLoaded", function() {
  // Tabs
  this.tabs = new Tabs(SelectorTabs, SelectorInfo, SelectorTabContent);

  // Timer
  this.timer = new Timer("#timer", "2019-10-20 15:11");

  // Modal
  this.modal = new Modal().SetOverlay(SelectorOverlay).SetClose(SelectorClose);
  this.moreButtons = new MoreButtons(this.modal, SelectorMoreButtons);

  // Form
  let message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так..."
  };

  let form = document.querySelector(".main-form"),
    input = form.getElementsByTagName("input"),
    statusMessage = document.createElement("div");

  statusMessage.classList.add("status");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open("POST", "server.php");
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    let formData = new FormData(form);
    request.send(formData);
  });
});

class Tabs {
  constructor(tabsSelector, infoSelector, tabContentSelector) {
    this.tabs = document.querySelectorAll(tabsSelector);
    this.tabContent = document.querySelectorAll(tabContentSelector);
    this.info = document.querySelector(infoSelector);
    this.info.addEventListener("click", function(event) {
      let tabs = window.tabs;
      let target = event.target;
      if (target && target.classList.contains("info-header-tab")) {
        for (let i = 0; i < tabs.tabs.length; i++) {
          if (target == tabs.tabs[i]) {
            tabs.hideTabContent(0);
            tabs.showTabContent(i);
            break;
          }
        }
      }
    });
    this.hideTabContent(1);
  }
  hideTabContent(a) {
    for (let i = a; i < this.tabContent.length; i++) {
      this.tabContent[i].classList.remove("show");
      this.tabContent[i].classList.add("hide");
    }
  }
  showTabContent(b) {
    if (this.tabContent[b].classList.contains("hide")) {
      this.tabContent[b].classList.remove("hide");
      this.tabContent[b].classList.add("show");
    }
  }
}

class Timer {
  constructor(timerSelector, deadline) {
    this.deadline = deadline;
    this.timer = document.querySelector(timerSelector);
    this.setClock();
  }
  setClock() {
    this.hours = this.timer.querySelector(".hours");
    this.minutes = this.timer.querySelector(".minutes");
    this.seconds = this.timer.querySelector(".seconds");
    this.timeInterval = setInterval(this.updateClock, 1000);
  }
  updateClock() {
    let timer = this.timer;
    let t = timer.getTimeRemaining();
    timer.hours.textContent = t.hours;
    timer.minutes.textContent = t.minutes;
    timer.seconds.textContent = t.seconds;

    if (t.total <= 0) {
      clearInterval(timer.timeInterval);
    }
  }
  getTimeRemaining() {
    let t = Date.parse(this.deadline) - Date.parse(new Date());
    let hours, minutes, seconds;

    if (t > 0) {
      seconds = "" + Math.floor((t / 1000) % 60);
      minutes = "" + Math.floor((t / 1000 / 60) % 60);
      hours = "" + Math.floor(t / 1000 / 60 / 60);
    } else {
      seconds = "00";
      minutes = "00";
      hours = "00";
    }

    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    if (hours.length == 1) {
      hours = "0" + hours;
    }

    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
}

class MoreButtons {
  constructor(modal, buttonsSelector) {
    this.modal = modal;
    this.buttons = document.querySelectorAll(buttonsSelector);
    this.setEventClick();
  }
  setEventClick() {
    this.buttons.forEach(element => {
      this.addMore.call(element);
    });
  }
  addMore() {
    this.addEventListener("click", () => {
      modal.show();
    });
  }
}

class Modal {
  SetOverlay(overlaySelector) {
    this.overlay = document.querySelector(overlaySelector);
    return this;
  }
  SetClose(closeSelector) {
    this.close = document.querySelector(closeSelector);
    this.close.addEventListener("click", () => {
      this.hide();
    });

    return this;
  }
  show() {
    this.overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  hide() {
    this.overlay.style.display = "none";
    document.body.style.overflow = "";
  }
}
