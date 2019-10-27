"use strict";

window.addEventListener("DOMContentLoaded", function() {
  let calc = require("./parts/calc.js"),
    slider = require("./parts/slider.js"),
    tabs = require("./parts/tabs.js"),
    timer = require("./parts/timer.js"),
    modal = require("./parts/modal");

  calc();
  slider();
  tabs();
  timer();
  modal();
});
