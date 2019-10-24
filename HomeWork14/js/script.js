"use strict";

const SelectorOverlay = ".overlay";
const SelectorClose = ".popup-close";
const SelectorMoreButtons = ".more, .description-btn";
const SelectorTabs = ".info-header-tab";
const SelectorInfo = ".info-header";
const SelectorTabContent = ".info-tabcontent";
const SelectorFormModal = ".main-form";
const SelectorFormContact = "#form";

window.addEventListener("DOMContentLoaded", function() {
  // Tabs
  this.tabs = new Tabs(SelectorTabs, SelectorInfo, SelectorTabContent);

  // Timer
  this.timer = new Timer("#timer", "2019-10-21 16:11");

  // Modal
  this.modal = new Modal().SetOverlay(SelectorOverlay).SetClose(SelectorClose);
  this.moreButtons = new MoreButtons(this.modal, SelectorMoreButtons);

  // Form Modal
  this.formModal = new Form(SelectorFormModal, "POST", "server.php");

  // Form Contact
  this.formContact = new Form(SelectorFormContact, "POST", "server.php");

  // Slider
  let slideIndex = 1,
    slides = document.querySelectorAll(".slider-item"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = document.querySelectorAll(".dot");

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    } else if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => (item.style.display = "none"));
    dots.forEach(item => item.classList.remove("dot-active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  prev.addEventListener("click", function() {
    plusSlides(-1);
  });

  next.addEventListener("click", function() {
    plusSlides(1);
  });

  dotsWrap.addEventListener("click", function(event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (
        event.target.classList.contains("dot") &&
        event.target == dots[i - 1]
      ) {
        currentSlide(i);
      }
    }
  });

  // Calc
  let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.getElementById("select"),
    totalValue = document.getElementById("total"),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  totalValue.innerText = 0;

  persons.addEventListener("change", function() {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  restDays.addEventListener("change", function() {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (persons.value == "" || restDays.value == "") {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  place.addEventListener("change", function() {
    if (restDays.value == "" || persons.value == "") {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
});

class Form {
  constructor(formSelector, method, URL) {
    this.method = method;
    this.URL = URL;

    this.form = document.querySelector(formSelector);
    this.inputs = this.form.getElementsByTagName("input");
    this.statusMessage = document.createElement("div");
    this.statusMessage.classList.add("status");

    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так..."
    };

    this.setSubmitAction();
  }
  setSubmitAction() {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      this.form.appendChild(this.statusMessage);

      let sendRequest = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(this.method, this.URL);
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );

        let formData = new FormData(this.form);

        let obj = {};
        formData.forEach(function(value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener("readystatechange", () => {
          if (request.readyState < 4) {
            this.setStatusMessage(this.message.loading);
            // this.statusMessage.innerHTML = this.message.loading;
          } else if (request.readyState == 4 && request.status == 200) {
            resolve(this.message.success);
          } else {
            reject(this.message.failure);
          }
        });
      });
      sendRequest
        .then(result => this.setStatusMessage(result))
        .catch(err => this.setStatusMessage(err))
        .finally(() => this.clearInputs());
    });
  }
  setStatusMessage(message) {
    this.statusMessage.innerHTML = message;
  }
  clearInputs() {
    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].value = "";
    }
  }
}

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
