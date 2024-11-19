// Get and change body
const body = document.body;
body.style.backgroundColor = "rgba(40,100,60,.5)";
body.style.fontFamily = "Arial, sans-serif";

// Create header element
const header = document.createElement("header");
header.style.color = "white";
header.style.padding = "20px";
header.style.textAlign = "center";
header.innerText = "Memory Game";
body.appendChild(header);

// Create main body content
const main = document.createElement("main");
main.style.display = "flex";
main.style.justifyContent = "center";
main.style.alignItems = "center";
main.style.height = "calc(100vh - 160px)";
body.appendChild(main);

const gameBoard = document.createElement("div");
gameBoard.id = "gameBoard";
gameBoard.style.display = "grid";
gameBoard.style.gridTemplateColumns = "repeat(4, 1fr)";
gameBoard.style.gap = "10px";
gameBoard.style.padding = "20px";
main.appendChild(gameBoard);

// Create footer element
const footer = document.createElement("footer");
footer.style.color = "white";
footer.style.padding = "10px";
footer.style.textAlign = "center";
footer.style.position = "fixed";
footer.style.width = "100%";
footer.style.bottom = "0";
footer.innerText = "By Everton Smith";
body.appendChild(footer);

const symbols = [
  "symbol1",
  "symbol2",
  "symbol3",
  "symbol4",
  "symbol5",
  "symbol6",
  "symbol7",
  "symbol8",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Generate the game board
function generateGameBoard() {
    let flippedCards = [];
    let matchedCards = [];
  
    let cardSymbols = [...symbols, ...symbols]; 
    shuffle(cardSymbols); 
  
    for (let i = 0; i < 16; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "100px";
      card.style.height = "100px";
      card.style.backgroundColor = "#4CAF50";
      card.style.display = "flex";
      card.style.alignItems = "center";
      card.style.justifyContent = "center";
      card.style.fontSize = "24px";
      card.style.color = "black";
      card.style.cursor = "pointer";
      card.style.position = "relative";
      card.style.perspective = "1000px";
  
      const cardInner = document.createElement("div");
      cardInner.className = "card-inner";
      cardInner.style.width = "100%";
      cardInner.style.height = "100%";
      cardInner.style.textAlign = "center";
      cardInner.style.transition = "transform 0.6s";
      cardInner.style.transformStyle = "preserve-3d";
      cardInner.style.position = "relative";
  
      const cardFront = document.createElement("div");
      cardFront.className = "card-front";
      cardFront.style.position = "absolute";
      cardFront.style.width = "100%";
      cardFront.style.height = "100%";
      cardFront.style.backfaceVisibility = "hidden";
      cardFront.style.display = "flex";
      cardFront.style.alignItems = "center";
      cardFront.style.justifyContent = "center";
      cardFront.style.backgroundColor = "#4CAF50";
  
      const cardBack = document.createElement("div");
      cardBack.className = `card-back ${cardSymbols[i]}`;
      cardBack.style.position = "absolute";
      cardBack.style.width = "100%";
      cardBack.style.height = "100%";
      cardBack.style.backfaceVisibility = "hidden";
      cardBack.style.display = "flex";
      cardBack.style.alignItems = "center";
      cardBack.style.justifyContent = "center";
      cardBack.style.backgroundColor = "white";
      cardBack.style.transform = "rotateY(180deg)";
  
      // Adding symbols to the card back
      const symbol = document.createElement("div");
      symbol.className = cardSymbols[i];
      switch (cardSymbols[i]) {
        case "symbol1":
          symbol.textContent = "★";
          break;
        case "symbol2":
          symbol.textContent = "♣";
          break;
        case "symbol3":
          symbol.textContent = "♠";
          break;
        case "symbol4":
          symbol.textContent = "♦";
          break;
        case "symbol5":
          symbol.textContent = "♥";
          break;
        case "symbol6":
          symbol.textContent = "☀";
          break;
        case "symbol7":
          symbol.textContent = "☁";
          break;
        case "symbol8":
          symbol.textContent = "¿";
          break;
      }
      cardBack.appendChild(symbol);
  
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
  
      card.addEventListener("click", () => {
        if (!matchedCards.includes(card) && !flippedCards.includes(card)) {
          card.classList.toggle("flipped");
          cardInner.style.transform = card.classList.contains("flipped")
            ? "rotateY(180deg)"
            : "rotateY(0deg)";
  
          flippedCards.push(card);
  
          if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            const firstSymbol = firstCard.querySelector(".card-back").classList[1];
            const secondSymbol = secondCard.querySelector(".card-back").classList[1];
  
            if (firstSymbol === secondSymbol) {
              // Matched
              matchedCards.push(firstCard, secondCard);
              flippedCards = [];
            } else {
              // Not matched
              setTimeout(() => {
                flippedCards.forEach(card => {
                  card.classList.remove("flipped");
                  card.querySelector(".card-inner").style.transform = "rotateY(0deg)";
                });
                flippedCards = [];
              }, 1000);
            }
          }
        }
        if (matchedCards.length === 16) {
            // All cards matched
            body.style.transition = 'background-color 1s';
            body.style.backgroundColor = 'red';
            body.style.transition = 'background-color 3s';
            setTimeout(() => {
              body.style.backgroundColor = 'rgba(40,100,60,.5)'; // Return to original color
            }, 5000);
          }
      });
  
      gameBoard.appendChild(card);
    }
  }
  

// Initialize the game board
generateGameBoard();
