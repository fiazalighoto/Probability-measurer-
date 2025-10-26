const simulateBtn = document.getElementById("simulateBtn");
const diceArea = document.getElementById("diceArea");
const resultText = document.getElementById("resultText");

simulateBtn.addEventListener("click", simulateDice);

function simulateDice() {
  const numDice = parseInt(document.getElementById("numDice").value);
  const numRolls = parseInt(document.getElementById("numRolls").value);
  const condition = document.getElementById("condition").value;
  const desiredSum = parseInt(document.getElementById("desiredSum").value);

  diceArea.innerHTML = "";
  resultText.innerText = "Rolling dice...";

  const rollSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_6e5982f4a3.mp3");

  // Animate dice
  for (let i = 0; i < numDice; i++) {
    const die = document.createElement("div");
    die.classList.add("die");
    diceArea.appendChild(die);
  }

  let rollCount = 0;
  const interval = setInterval(() => {
    diceArea.childNodes.forEach(die => {
      const face = Math.floor(Math.random() * 6) + 1;
      die.innerText = face;
      die.classList.add("rollAnim");
    });
    rollSound.play();
    rollCount++;
    if (rollCount >= numRolls) {
      clearInterval(interval);
      // Probability calculation
      const probability = calculateDiceProbability(numDice, numRolls, condition, desiredSum);
      resultText.innerHTML = `<strong>Condition:</strong> ${condition} ${desiredSum}<br>
                              <strong>Probability:</strong> ${probability.toFixed(4)}`;
    }
  }, 600);
}

// Calculate probability using simulation approximation
function calculateDiceProbability(numDice, numRolls, condition, desiredSum) {
  let success = 0;
  for (let i = 0; i < 10000; i++) {
    let sum = 0;
    for (let j = 0; j < numDice; j++) {
      sum += Math.floor(Math.random() * 6) + 1;
    }
    if ((condition === "exactly" && sum === desiredSum) ||
        (condition === "atleast" && sum >= desiredSum) ||
        (condition === "atmost" && sum <= desiredSum)) {
      success++;
    }
  }
  return success / 10000;
}
