const simulateBtn = document.getElementById("simulateBtn");
const coinArea = document.getElementById("coinArea");
const resultText = document.getElementById("resultText");

simulateBtn.addEventListener("click", simulateCoins);

function simulateCoins() {
  const numCoins = parseInt(document.getElementById("numCoins").value);
  const numFlips = parseInt(document.getElementById("numFlips").value);
  const condition = document.getElementById("condition").value;
  const side = document.getElementById("side").value;
  const numDesired = parseInt(document.getElementById("numDesired").value);

  coinArea.innerHTML = "";
  resultText.innerText = "Flipping coins...";

  const flipSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_6e5982f4a3.mp3");

  let totalDesired = 0;

  // Animate coin flips
  for (let i = 0; i < numCoins; i++) {
    const coin = document.createElement("div");
    coin.classList.add("coin");
    coinArea.appendChild(coin);
  }

  let flipCount = 0;
  const interval = setInterval(() => {
    coinArea.childNodes.forEach(coin => {
      coin.classList.toggle("flip");
    });
    flipSound.play();
    flipCount++;
    if (flipCount >= numFlips) {
      clearInterval(interval);
      const result = Math.random() < 0.5 ? "heads" : "tails";
      const totalHeads = simulateFlips(numCoins, numFlips, "heads");
      const probability = calculateProbability(numFlips, numCoins, condition, numDesired);
      resultText.innerHTML = `
        <strong>Result:</strong> ${totalHeads} heads out of ${numFlips} flips<br>
        <strong>Condition:</strong> ${condition} ${numDesired} ${side}<br>
        <strong>Probability:</strong> ${probability.toFixed(4)}
      `;
    }
  }, 600);
}

// Helper: binomial coefficient
function nCr(n, r) {
  if (r > n) return 0;
  let num = 1, den = 1;
  for (let i = 0; i < r; i++) {
    num *= (n - i);
    den *= (i + 1);
  }
  return num / den;
}

// Helper: probability calculation
function calculateProbability(flips, coins, condition, desired) {
  const p = 0.5;
  let totalProb = 0;

  for (let k = 0; k <= flips; k++) {
    const prob = nCr(flips, k) * Math.pow(p, k) * Math.pow(1 - p, flips - k);
    if (
      (condition === "exactly" && k === desired) ||
      (condition === "atleast" && k >= desired) ||
      (condition === "atmost" && k <= desired)
    ) {
      totalProb += prob;
    }
  }
  return totalProb;
}

function simulateFlips(numCoins, numFlips, side) {
  let heads = 0;
  for (let i = 0; i < numFlips * numCoins; i++) {
    if (Math.random() < 0.5) heads++;
  }
  return heads;
}
