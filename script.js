const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const timerDisplay = document.getElementById("timer");
const tapCountDisplay = document.getElementById("tap-count");
const distanceDisplay = document.getElementById("distance");
const commentDisplay = document.getElementById("comment");
const tapArea = document.getElementById("tap-area");
const rickshaw = document.getElementById("rickshaw");

let tapCount = 0;
let timer = 10;
let gameInterval;
let gameActive = false;

let backgroundOffset = 0;
let rickshawPixels = 0;
const maxRickshawMove = window.innerWidth / 2 - 100; // center offset

const countdownDisplay = document.getElementById("countdown");
const bgMusic = document.getElementById("bg-music");

const highScoreDisplay = document.getElementById("high-score");
let highScore = parseFloat(localStorage.getItem("rickshawHighScore")) || 0;




function startGame() {
  tapCount = 0;
  timer = 10;
  gameActive = false;
  backgroundOffset = 0;
  rickshawPixels = 0;
  tapArea.style.backgroundPositionX = `0px`;
  rickshaw.style.transform = `translateX(0px)`;
  tapCountDisplay.textContent = tapCount;
  timerDisplay.textContent = timer;

  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  gameScreen.classList.add("active");

  highScoreDisplay.textContent = highScore.toFixed(1);


  let count = 3;
  countdownDisplay.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count === 0) {
      countdownDisplay.textContent = "Go!";
    } else if (count < 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "";
      bgMusic.play(); // start music
      gameActive = true;
      gameInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer === 0) endGame();
      }, 1000);
    } else {
      countdownDisplay.textContent = count;
    }
  }, 1000);
}

// function endGame() {
//   clearInterval(gameInterval);
//   gameActive = false;
//   const distance = (tapCount * 1.5).toFixed(1);
//   distanceDisplay.textContent = distance;

//   if (tapCount < 90) {
//     commentDisplay.textContent = "Ei je, lokera toh hete taratari chole jacche!";
//   } else if (tapCount < 150) {
//     commentDisplay.textContent = "Besh Dhoom machale Dhoom machale byapar aache tomar rickshaw e!";
//   } else {
//     commentDisplay.textContent = "Tumi toh pro driver guru 🛺";
//   }

//   bgMusic.pause();
//   bgMusic.currentTime = 0;

//   gameScreen.classList.remove("active");
//   endScreen.classList.add("active");
// }

function endGame() {
  clearInterval(gameInterval);
  gameActive = false;

  const distance = (tapCount * 1.5).toFixed(1);
  distanceDisplay.textContent = distance;

  // 🏆 Update high score
  if (parseFloat(distance) > highScore) {
    highScore = parseFloat(distance);
    localStorage.setItem("rickshawHighScore", highScore);
  }
  highScoreDisplay.textContent = highScore.toFixed(1);

  // 🎯 Show performance comment
  if (tapCount < 90) {
    commentDisplay.textContent = "Ei je, lokera toh hete taratari chole jacche!";
  } else if (tapCount < 150) {
    commentDisplay.textContent = "Besh! Dhoom machale rickshaw e!";
  } else {
    commentDisplay.textContent = "Tumi toh pro driver guru 🛺";
  }

  bgMusic.pause();
  bgMusic.currentTime = 0;

  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
}


function handleTap() {
  if (!gameActive) return;
  tapCount++;
  tapCountDisplay.textContent = tapCount;

  if (rickshawPixels < maxRickshawMove) {
    rickshawPixels += 10; // move rickshaw until center
    rickshaw.style.transform = `translateX(${rickshawPixels}px)`;
  } else {
    backgroundOffset += 15; // then move background
    tapArea.style.backgroundPositionX = `-${backgroundOffset}px`;
  }
}

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", () => {
  startScreen.classList.add("active");
  endScreen.classList.remove("active");
});

tapArea.addEventListener("click", handleTap);
tapArea.addEventListener("touchstart", handleTap);

