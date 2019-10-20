window.addEventListener("DOMContentLoaded", function() {
  "use strict";
  let tab = document.querySelectorAll(".info-header-tab"),
    info = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  info.addEventListener("click", function(event) {
    let target = event.target;
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });
  hideTabContent(1);

  // Timer
  let deadline = "2019-10-20 23:29";

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
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

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock("timer", deadline);

  // Modal
  let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close");

  function addMore() {
    this.addEventListener("click", function() {
      overlay.style.display = "block";
      this.classList.add("more-splash");
      document.body.style.overflow = "hidden";
    });
  }

  addMore.call(more);

  let moreBtns = document.querySelectorAll(".description-btn");
  moreBtns.forEach(function(element) {
    addMore.call(element);
  });

  close.addEventListener("click", function() {
    overlay.style.display = "none";
    more.classList.remove("more-splash");
    document.body.style.overflow = "";
  });
});
