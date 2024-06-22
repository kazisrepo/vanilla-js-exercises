"use strict";

/*  
   Project to create a timer object
   Author: Kazi Islam; 301163646
   Date:  April 17 2024
*/

/*--------------- Object Code --------------------*/

function Timer(min, sec, millisec) {
  this.minutes = min;
  this.seconds = sec;
  this.milliseconds = millisec;
  this.timeID = null;
}

Timer.prototype.runPause = function (minBox, secBox, millisecBox) {
  let timer = this;
  if (timer.timeID) {
    window.clearInterval(timer.timeID);
    timer.timeID = null;
  } else {
    timer.timeID = window.setInterval(function () {
      timer.countdown(minBox, secBox, millisecBox);
    }, 100);
  }
};

Timer.prototype.countdown = function (minBox, secBox, millisecBox) {
  let timer = this;
  if (timer.minutes === 0 && timer.seconds === 0 && timer.milliseconds === 0) {
    clearInterval(timer.timeID);
    timer.timeID = null;
    return;
  }
  if (timer.milliseconds > 0) {
    //timer.milliseconds--;
    timer.milliseconds -= 100;
  } else {
    timer.milliseconds = 900;
    if (timer.seconds > 0) {
      timer.seconds--;
    } else {
      if (timer.minutes > 0) {
        timer.seconds = 59;
        timer.minutes--;
      }
    }
  }

  minBox.value = timer.minutes;
  secBox.value = timer.seconds;
  millisecBox.value = timer.milliseconds;
};

/*---------------Interface Code -----------------*/

/* Interface Objects */
let minBox = document.getElementById("minutesBox");
let secBox = document.getElementById("secondsBox");
let millisecBox = document.getElementById("millisecondsBox");
let runPauseTimer = document.getElementById("runPauseButton");

let myTimer = new Timer(
  parseInt(minBox.value),
  parseInt(secBox.value),
  parseInt(millisecBox.value)
);

minBox.onchange = function () {
  myTimer.minutes = parseInt(minBox.value);
};

secBox.onchange = function () {
  myTimer.seconds = parseInt(secBox.value);
};

millisecBox.onchange = function () {
  myTimer.milliseconds = parseInt(millisecBox.value);
};

runPauseTimer.onclick = function () {
  myTimer.runPause(minBox, secBox, millisecBox);
};
