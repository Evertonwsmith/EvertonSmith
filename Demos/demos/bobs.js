window.onload = async function () {
    const alert = document.getElementById('alert');
    const score = document.getElementById('score');
    const prompt = document.getElementById('prompt');
    const one = document.getElementById('one');
    const two = document.getElementById('two');
    const three = document.getElementById('three');
    let nameImageMap = [];
    let currentScore = 0;

    score.innerHTML = `<h1>Correct Answers: ${currentScore}</h1>`;
    alert.innerHTML = `<h1>Last Answer was ___ you were ___</h1>`;

    async function mapCleanNamesWithImages() {
        try {
            const response = await fetch("https://bobsburgers-api.herokuapp.com/characters/");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const characters = await response.json();
            nameImageMap = characters.map(character => ({
                name: character.name.replace(/['"/]/g, ""), // Clean the name
                image: character.image // Map the image field
            }));
            console.log("Mapped names and images:", nameImageMap);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    function getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function startNewGame() {
        if (nameImageMap.length === 0) {
            console.error("Name-Image map is empty. Cannot start the game.");
            return;
        }

        const selectedCharacters = [];
        while (selectedCharacters.length < 3) {
            const randomCharacter = getRandom(nameImageMap);
            if (!selectedCharacters.includes(randomCharacter)) {
                selectedCharacters.push(randomCharacter);
            }
        }

        const correctAnswer = getRandom(selectedCharacters);

        // Display the image
        prompt.innerHTML = `<img src="${correctAnswer.image}" alt="Character" style="max-width: 100%; height: auto;">`;

        // Assign names to buttons
        [one, two, three].forEach((button, index) => {
            button.textContent = selectedCharacters[index].name;
            button.onclick = () => {
                if (selectedCharacters[index] === correctAnswer) {
                    currentScore++;
                    alert.innerHTML = `<h1>Correct! You selected ${correctAnswer.name}</h1>`;
                } else {
                    alert.innerHTML = `<h1>Wrong! The correct answer was ${correctAnswer.name}</h1>`;
                }
                score.innerHTML = `<h1>Correct Answers: ${currentScore}</h1>`;
                startNewGame();
            };
        });
    }

    // Fetch data and start the game
    await mapCleanNamesWithImages();
    startNewGame();
};
