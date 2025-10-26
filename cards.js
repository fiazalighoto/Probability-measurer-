const simulateBtn = document.getElementById("simulateBtn");
const deckArea = document.getElementById("deckArea");
const resultText = document.getElementById("resultText");

// Full deck
const suits = ["hearts", "diamonds", "clubs", "spades"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

// Build deck
function buildDeck() {
  deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value });
    });
  });
}
buildDeck();

simulateBtn.addEventListener("click", simulateCards);

function simulateCards() {
  const numDraw = parseInt(document.getElementById("numDraw").value);
  const condition = document.getElementById("condition").value;
  const cardType = document.getElementById("cardType").value;
  const numDesired = parseInt(document.getElementById("numDesired").value);

  deckArea.innerHTML = "";
  resultText.innerText = "Shuffling and drawing cards...";

  // Shuffle deck
  const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);

  // Draw cards
  const drawnCards = shuffledDeck.slice(0, numDraw);

  // Display cards
  drawnCards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `${card.value} <br> ${card.suit}`;
    deckArea.appendChild(cardDiv);
  });

  // Count matching suit
  const matchCount = drawnCards.filter(c => c.suit === cardType).length;

  // Calculate probability (approximation using simulation)
  const probability = simulateProbability(numDraw, cardType, condition, numDesired);

  resultText.innerHTML = `<strong>Drawn Cards:</strong> ${drawnCards.length}<br>
                          <strong>Matching ${cardType}:</strong> ${matchCount}<br>
                          <strong>Condition:</strong> ${condition} ${numDesired}<br>
                          <strong>Probability:</strong> ${probability.toFixed(4)}`;
}

// Probability simulation (Monte Carlo)
function simulateProbability(numDraw, cardType, condition, numDesired) {
  let success = 0;
  const trials = 10000;
  for (let i = 0; i < trials; i++) {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    const draw = shuffled.slice(0, numDraw);
    const count = draw.filter(c => c.suit === cardType).length;
    if ((condition === "exactly" && count === numDesired) ||
        (condition === "atleast" && count >= numDesired) ||
        (condition === "atmost" && count <= numDesired)) {
      success++;
    }
  }
  return success / trials;
}
