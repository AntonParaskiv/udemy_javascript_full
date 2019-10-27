/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/parts/calc.js":
/*!**************************!*\
  !*** ./js/parts/calc.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
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
}

module.exports = calc;


/***/ }),

/***/ "./js/parts/modal.js":
/*!***************************!*\
  !*** ./js/parts/modal.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

const SelectorOverlay = ".overlay";
const SelectorClose = ".popup-close";
const SelectorMoreButtons = ".more, .description-btn";
const SelectorFormModal = ".main-form";
const SelectorFormContact = "#form";

function modal() {
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

  // Modal
  this.modal = new Modal().SetOverlay(SelectorOverlay).SetClose(SelectorClose);
  this.moreButtons = new MoreButtons(this.modal, SelectorMoreButtons);

  // Form Modal
  this.formModal = new Form(SelectorFormModal, "POST", "server.php");
  // Form Contact
  this.formContact = new Form(SelectorFormContact, "POST", "server.php");
}

module.exports = modal;


/***/ }),

/***/ "./js/parts/slider.js":
/*!****************************!*\
  !*** ./js/parts/slider.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
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
}

module.exports = slider;


/***/ }),

/***/ "./js/parts/tabs.js":
/*!**************************!*\
  !*** ./js/parts/tabs.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

const SelectorTabs = ".info-header-tab";
const SelectorInfo = ".info-header";
const SelectorTabContent = ".info-tabcontent";

function tabs() {
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

  this.tabs = new Tabs(SelectorTabs, SelectorInfo, SelectorTabContent);
}

module.exports = tabs;


/***/ }),

/***/ "./js/parts/timer.js":
/*!***************************!*\
  !*** ./js/parts/timer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {
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

  this.timer = new Timer("#timer", "2019-10-27 16:11");
}

module.exports = timer;


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener("DOMContentLoaded", function() {
  let calc = __webpack_require__(/*! ./parts/calc.js */ "./js/parts/calc.js"),
    slider = __webpack_require__(/*! ./parts/slider.js */ "./js/parts/slider.js"),
    tabs = __webpack_require__(/*! ./parts/tabs.js */ "./js/parts/tabs.js"),
    timer = __webpack_require__(/*! ./parts/timer.js */ "./js/parts/timer.js"),
    modal = __webpack_require__(/*! ./parts/modal */ "./js/parts/modal.js");

  calc();
  slider();
  tabs();
  timer();
  modal();
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map