let score = 0;
let character = "";
let options = [];

document.addEventListener("DOMContentLoaded", () => {
  const gameScore = document.getElementById("gameScore");
  const gameImage = document.getElementById("gameImage");
  const gameButton1 = document.getElementById("gameButton1");
  const gameButton2 = document.getElementById("gameButton2");
  const gameButton3 = document.getElementById("gameButton3");

  score = 0;

  // Function to generate a new question
  async function generateQuestion() {
    const randomNumbers = new Set();
    while (randomNumbers.size < 3) {
      randomNumbers.add(Math.floor(Math.random() * 494) + 1);
    }

    const randomArray = Array.from(randomNumbers);
    const promises = randomArray.map((id) =>
      fetch(`https://bobsburgers-api.herokuapp.com/characters/${id}`).then((res) =>
        res.json()
      )
    );

    try {
      const results = await Promise.all(promises);

      // Clear previous options and set new character and options
      options = [];
      character = results[0].image; // First character's image
      options.push(results[0].name);
      options.push(results[1].name);
      options.push(results[2].name);

      return true;
    } catch (error) {
      console.error("Error fetching character data:", error);
      return false;
    }
  }

  // Function to shuffle and load the game UI
  async function loadNewGame() {
    const isGenerated = await generateQuestion();
    if (!isGenerated) {
      return; // Exit if there was an error generating the question
    }

    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    // Update UI
    gameScore.innerHTML = "Score: " + score;
    gameImage.src = character;

    // Assign shuffled options to buttons
    gameButton1.innerHTML = shuffledOptions[0];
    gameButton2.innerHTML = shuffledOptions[1];
    gameButton3.innerHTML = shuffledOptions[2];

    console.log("Shuffled Options:", shuffledOptions);
  }

  // Start the game
  loadNewGame();
});
