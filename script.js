const board = document.getElementById("game-board");
const movesElement = document.getElementById("moves");
const levelElement = document.getElementById("level");
const restartBtn = document.getElementById("restart");

const allEmojis = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍊", "🍍", "🥝", "🍒", "🍑", "🥥", "🫐", "🥭", "🍋", "🍈", "🥕", "🍅", "🌽", "🥔", "🥦"];
let level = 1;
let moves = 0;
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateBoardSize(pairCount) {
  let columns = Math.ceil(Math.sqrt(pairCount * 2));
  board.style.gridTemplateColumns = `repeat(${columns}, 80px)`;
}

function createCard(emoji) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = "❓";

  card.dataset.emoji = emoji;

  card.addEventListener("click", () => {
    if (card.classList.contains("flipped") || flippedCards.length === 2) return;

    card.textContent = emoji;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      movesElement.textContent = moves;
      checkMatch();
    }
  });

  return card;
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards += 2;
    flippedCards = [];

    if (matchedCards === board.children.length) {
      setTimeout(() => {
        alert(`🎉 Level ${level} complete in ${moves} moves!`);
        level++;
        startGame();
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.textContent = "❓";
      card2.textContent = "❓";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

function startGame() {
  board.innerHTML = "";
  moves = 0;
  matchedCards = 0;
  flippedCards = [];
  movesElement.textContent = moves;
  levelElement.textContent = level;

  const pairs = Math.min(level + 1, allEmojis.length); // Increase emoji pairs each level
  const selectedEmojis = allEmojis.slice(0, pairs);
  const cards = [...selectedEmojis, ...selectedEmojis]; // Duplicate for matching
  shuffle(cards);

  updateBoardSize(pairs);

  cards.forEach(emoji => {
    const card = createCard(emoji);
    board.appendChild(card);
  });
}

restartBtn.addEventListener("click", () => {
  level = 1;
  startGame();
});

startGame();
