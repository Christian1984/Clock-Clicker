(function() {
  let score = 0;
  let newScore = 0;
  let millis = 0;
  let millisStepsize = 10;

  let interval = undefined;

  const body = document.querySelector("body");
  const scoreDisplay = document.querySelector("#score");
  const newScoreDisplay = document.querySelector("#newScore");
  let pulse = document.querySelector("#pulse");

  function triggerClock() {
    score += newScore;
    scoreDisplay.textContent = score;
    millis = 0;
    
    var newPulse = pulse.cloneNode();
    pulse.parentNode.replaceChild(newPulse, pulse);
    pulse = newPulse;
    pulse.classList.add("pulse-active");
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