let countdownInterval, specialInterval, beepInterval, elapsed = 0;
const countdownDisplay = document.getElementById('countdownDisplay');
const specialDisplay = document.getElementById('specialDisplay');

function updateTime() {
  const now = new Date();
  document.querySelectorAll('#currentTime').forEach(el => {
    el.textContent = now.toLocaleTimeString();
  });
}
setInterval(updateTime, 1000);
updateTime();

function startCountdown(seconds) {
  clearInterval(countdownInterval);
  clearInterval(beepInterval);
  seconds = parseInt(seconds);
  if (!seconds || seconds <= 0) return;
  countdownDisplay.textContent = `剩余时间：${seconds}秒`;
  countdownInterval = setInterval(() => {
    seconds--;
    countdownDisplay.textContent = `剩余时间：${seconds}秒`;
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "时间到！";
      startBeeping();
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  clearInterval(beepInterval);
  countdownDisplay.textContent = "已重置";
}

function startSpecialTimer() {
  clearInterval(specialInterval);
  elapsed = 0;
  speak("开始");
  specialDisplay.textContent = "开始计时...";
  specialInterval = setInterval(() => {
    elapsed++;
    if ([10, 20, 30, 35, 40].includes(elapsed)) {
      speak(`${elapsed}秒`);
    } else if (elapsed >= 43) {
      speak("时间到");
    }
    specialDisplay.textContent = `已计时：${elapsed}秒`;
  }, 1000);
}

function resetSpecial() {
  clearInterval(specialInterval);
  elapsed = 0;
  specialDisplay.textContent = "已重置";
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

function playBeep() {
  const beep = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=");
  beep.play();
}

function startBeeping() {
  playBeep();
  beepInterval = setInterval(playBeep, 2000); // 每2秒响一次
}
