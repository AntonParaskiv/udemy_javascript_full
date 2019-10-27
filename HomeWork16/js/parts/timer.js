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
