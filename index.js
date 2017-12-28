(function() {
  let score = 0;
  let newScore = 0;
  let millis = 0;
  let millisStepsize = 10;

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

  function spawnFeedback(millis, newScore) {
    const newFeedback = feedbackTemplate.cloneNode(true);
    newFeedback.setAttribute("id", "feedback-active");

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
    spawnFeedback(millis, newScore);    
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