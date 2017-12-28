"use strict";

(function() {
  let score = 0;
  let perfectStreak = 0;
  let newScore = 0;
  let millis = 0;
  let millisStepsize = 10;

  let deviationThresholds = {
    perfect: 10,
    good: 20,
    okay: 35
  }

  let interval = undefined;

  const body = document.querySelector("body");
  const scoreDisplay = document.querySelector("#score");
  const newScoreDisplay = document.querySelector("#newScore");
  const pulseWrapper = document.querySelector(".pulseWrapper");
  const feedbackWrapper = document.querySelector(".feedbackWrapper");

  const pulseTemplate = document.querySelector("#pulse-template");
  let pulse = undefined;

  const feedbackTemplate = document.querySelector("#feedback-template");
  let feedback = undefined;

  function getFeedbackColorAndText(deviation) {
    let text = "POOR";
    let className = "poor";

    if (deviation <= deviationThresholds.perfect) {
      text = "PERFECT";

      if (perfectStreak > 1) {
        text = text + ' \u00D7 ' + perfectStreak;
      }
      className = "perfect";
    }
    else if (deviation <= deviationThresholds.good) {
      text = "GOOD";
      className = "good";
    }
    else if (deviation <= deviationThresholds.okay) {
      text = "OKAY";
      className = "okay";
    }

    return { text, className };
  }

  function spawnFeedback(deviation, newScore) {
    const newFeedback = feedbackTemplate.cloneNode(true);
    newFeedback.setAttribute("id", "feedback-active");

    let colorAndText = getFeedbackColorAndText(deviation);
    newFeedback.classList.add(colorAndText.className);
    newFeedback.querySelector(".feedback-text").textContent = colorAndText.text;
    newFeedback.querySelector(".feedback-score").textContent = newScore;

    if (feedback) {
      feedbackWrapper.replaceChild(newFeedback, feedback);
    }
    else {
      feedbackWrapper.appendChild(newFeedback);
    }

    feedback = newFeedback;
  }

  function spawnPulse() {
    const newPulse = pulseTemplate.cloneNode();
    newPulse.setAttribute("id", "pulse-active");

    if (pulse) {
      pulseWrapper.replaceChild(newPulse, pulse);
    }
    else {
      pulseWrapper.appendChild(newPulse);
    }

    pulse = newPulse;
  }

  function triggerClock() {
    let deviation = Math.abs(millis - 1000) / 10;

    if (deviation <= deviationThresholds.perfect) {
      perfectStreak++;
      newScore *= perfectStreak;
    }
    else {
      perfectStreak = 0;
    }

    spawnFeedback(deviation, newScore);    
    spawnPulse();

    score += newScore;
    scoreDisplay.textContent = score;
    millis = 0;
  }

  body.addEventListener("click", () => triggerClock());
  window.addEventListener("keyup", (e) => {
    if (e.keyCode === 32) triggerClock();
  });

  interval = setInterval(() => {
    if (millis < 2000) {
      millis += millisStepsize;

      if (millis <= 1000) {
        newScore = millis;
      }
      else {
        newScore = 2000 - millis;
      }

      newScoreDisplay.textContent = newScore;

      return;
    }

    //reset
    //millis = 0;
  }, millisStepsize);
})();