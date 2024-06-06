// Cache DOM elements
const pages = [];

const charactersDiv = document.getElementById("characters");
const episodesDiv = document.getElementById("episodes");
const storeNextDoorDiv = document.getElementById("storeNextDoor");
const pestControlTruckDiv = document.getElementById("pestControlTruck");
const burgerOfTheDayDiv = document.getElementById("burgerOfTheDay");
const pageTitleDiv = document.getElementById("pageTitle");
const showPictureButton = document.getElementById("showPics");

let characters = [];
let belchers;
let episodes = [];
let storeNextDoors = [];
let pestControlTrucks = [];
let burgerOfTheDays = [];
let showPicturesBool = true;

pages.push(
  charactersDiv,
  episodesDiv,
  storeNextDoorDiv,
  pestControlTruckDiv,
  burgerOfTheDayDiv
);

const fetchUrls = [
  "https://bobsburgers-api.herokuapp.com/characters",
  "https://bobsburgers-api.herokuapp.com/episodes",
  "https://bobsburgers-api.herokuapp.com/storeNextDoor/",
  "https://bobsburgers-api.herokuapp.com/pestControlTruck/",
  "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/",
];

// Initial page setup
// characterPage();

//loading
const loadingDiv = document.getElementById("loading");
loadingDiv.innerHTML = "<h1>Loading...</h1>";

Promise.all(
  fetchUrls.map((url) => fetch(url).then((response) => response.json()))
)
  .then(([charData, episData, sndData, pcvData, botdData]) => {
    generateCharacterData(charData);
    generateEpisodeData(episData);
    generateStoreNextDoorData(sndData);
    generatePestControlVanData(pcvData);
    generateBurgerOfTheDayData(botdData);
    loadingDiv.style.display = "none";
    console.log(characters);
    console.log(episodes);
    console.log(storeNextDoors);
    console.log(pestControlTrucks);
    console.log(burgerOfTheDays);

    /**
     *
     *
     *
     *
     * initial
     */
    characterPage();
    setBelchers();
    // Hide loading indicator and show content
  })
  .catch((error) => console.error("Error fetching data:", error));

function characterPage() {
  setIndex(1);
}
function episodesPage() {
  setIndex(2);
}
function storeNextDoor() {
  setIndex(3);
}
function pestControlTruck() {
  setIndex(4);
}
function burgerOfTheDay() {
  setIndex(5);
}
function clearScreen(){
  document.body.innerHTML = '';
}

function setIndex(index) {
  pages.forEach((p) => (p.style.display = "none"));

  switch (index) {
    case 1:
      //SHOW CHARACTERS HIDE ELSE
      charactersDiv.style.display = "flex";
      charactersDiv.style.flexDirection = "row";
      break;
    case 2:
      //SHOW EPISODES HIDE ELSE
      break;
    case 3:
      //SHOW STORENEXTDOOR..
      break;
    case 4:
      //show van..
      break;
    case 5:
      //burgeroftheday
      break;
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 */
function setBelchers(){
  setLouise();
  setLinda();
  setBob();
  setGene();
  setTina();
}
function setLouise() {
  let louise = findCharacter("L", "Louise Belcher", characters);
  let characterDiv = makeCharacterDiv();
  let characterImage = document.createElement('img');
  characterImage.src = louise.image;
  characterImage.style = 'width:200px;';
  characterDiv.appendChild(characterImage);
  let characterName = document.createElement("h3");
  console.log(louise);
  characterName.innerHTML = louise.name;
  characterDiv.appendChild(characterName);
  charactersDiv.appendChild(characterDiv);
}
function setLinda() {
  let linda = findCharacter("L", "Linda Belcher", characters);
  let characterDiv = makeCharacterDiv();
  let characterImage = document.createElement('img');
  characterImage.src = linda.image;
  characterImage.style = 'width:200px;';
  characterDiv.appendChild(characterImage);
  let characterName = document.createElement("h3");
  console.log(linda);
  characterName.innerHTML = linda.name;
  characterDiv.appendChild(characterName);
  charactersDiv.appendChild(characterDiv);
}
function setBob() {
  let bob = findCharacter("R", 'Robert "Bob" Belcher, Jr.', characters);
  let characterDiv = makeCharacterDiv();
  let characterImage = document.createElement('img');
  characterImage.src = bob.image;
  characterImage.style = 'width:200px;';
  characterDiv.appendChild(characterImage);
  let characterName = document.createElement("h3");
  console.log(bob);
  characterName.innerHTML = bob.name;
  characterDiv.appendChild(characterName);
  charactersDiv.appendChild(characterDiv);
}
function setGene() {
  let gene = findCharacter("G", "Gene Belcher", characters);
  let characterDiv = makeCharacterDiv();
  let characterImage = document.createElement('img');
  characterImage.src = gene.image;
  characterImage.style = 'width:200px;';
  characterDiv.appendChild(characterImage);
  let characterName = document.createElement("h3");
  console.log(gene);
  characterName.innerHTML = gene.name;
  characterDiv.appendChild(characterName);
  charactersDiv.appendChild(characterDiv);
}
function setTina() {
  let tina = findCharacter("T", "Tina Ruth Belcher", characters);
  let characterDiv = makeCharacterDiv();
  let characterImage = document.createElement('img');
  characterImage.src = tina.image;
  characterImage.style = 'width:200px;';
  characterDiv.appendChild(characterImage);
  let characterName = document.createElement("h3");
  console.log(tina);
  characterName.innerHTML = tina.name;
  characterDiv.appendChild(characterName);
  charactersDiv.appendChild(characterDiv);
}

function makeCharacterDiv() {
  let result = document.createElement("div");
  result.style =
    "margin:40px;background-color:rgba(255,255,255,.9);border-radius:25px;display:flex;flex-direction:column;justify-column:center;align-items:center;padding:50px;box-shadow:2px 2px 5px;";
  return result;
}

function findCharacter(firstLetter, name, array) {
  console.log(array);
  const matchingGroup = array.find((obj) => obj[firstLetter]);

  if (matchingGroup) {
    // Extract the array of characters associated with the firstLetter
    const characters = matchingGroup[firstLetter];
    
    // Search for the character within the characters array
    return characters.find((character) => character.name === name) || null;
  }

  return null; // Return null if not found
}

/**
 *
 *
 *
 *
 */
function generateCharacterData(data) {
  const characterData = {};

  data.forEach((character) => {
    const letter = character.name.replace(/['"]/g, "").charAt(0).toUpperCase();

    if (!characterData[letter]) {
      characterData[letter] = [];
    }
    characterData[letter].push(character);
  });

  for (const letter in characterData) {
    characters.push({ [letter]: characterData[letter] });
  }
}
function generateEpisodeData(data) {
  const seasonData = {};

  data.forEach((episode) => {
    const season = episode.season;

    if (!seasonData[season]) {
      seasonData[season] = [];
    }
    seasonData[season].push(episode);
  });

  for (const season in seasonData) {
    seasonData[season].sort((a, b) => a.episode - b.episode);
    episodes.push({ [season]: seasonData[season] });
  }
}
function generateStoreNextDoorData(data) {
  const seasonData = {};

  data.forEach((snd) => {
    const season = snd.season;

    if (!seasonData[season]) {
      seasonData[season] = [];
    }
    seasonData[season].push(snd);
  });

  for (const season in seasonData) {
    seasonData[season].sort((a, b) => a.episode - b.episode);
    storeNextDoors.push({ [season]: seasonData[season] });
  }
}
function generatePestControlVanData(data) {
  const vanData = {};
  data.forEach((van) => {
    const season = van.season;
    const episode = van.episode;
    if (!vanData[season]) {
      vanData[season] = [];
    }
    vanData[season].push(van);
  });

  for (const van in vanData) {
    vanData[van].sort((a, b) => a.episode - b.episode);
    pestControlTrucks.push({
      [van]: vanData[van],
    });
  }
}
function generateBurgerOfTheDayData(data) {
  const burgerData = {};
  data.forEach((burger) => {
    const season = burger.season;
    if (!burgerData[season]) {
      burgerData[season] = [];
    }
    burgerData[season].push(burger);
  });

  for (const burger in burgerData) {
    burgerData[burger].sort((a, b) => a.episode - b.episode);
    burgerOfTheDays.push({
      [burger]: burgerData[burger],
    });
  }
}

function sea(seasonIndex) {
  const box = document.getElementById("tableDataEpi");
  box.innerHTML = ""; // Clear existing content

  if (seasonIndex >= 0 && seasonIndex < EPIs.length) {
    const season = EPIs[seasonIndex];

    for (const seasonKey in season) {
      season[seasonKey].forEach((epi) => {
        const text = document.createElement("h2");
        text.innerHTML = `<br><br><br>${epi.name}`;

        const text2 = document.createElement("div");
        text2.style.display = "flex";
        text2.style.flexDirection = "column";
        text2.style.alignContent = "center";
        text2.style.padding = "25px";
        text2.style.backgroundColor = "rgba(20,250,0,.2)";
        text2.innerHTML = `<h3> Season: ${epi.season} Episode: ${epi.episode}</h3>
                           <p>Air Date: ${epi.airDate}</p>
                           <p>Total Viewers: ${epi.totalViewers}</p>`;

        box.appendChild(text);
        box.appendChild(text2);
      });
    }
  }
}
function snd(seasonIndex) {
  const box = document.getElementById("tableData");
  box.innerHTML = ""; // Clear existing content

  if (seasonIndex >= 0 && seasonIndex < SNDs.length) {
    const season = SNDs[seasonIndex];

    for (const seasonKey in season) {
      season[seasonKey].forEach((store) => {
        const tempdiv = document.createElement("div");
        tempdiv.style =
          "display:flex;flex-direction:column;justify-content:center;margin:10px;";
        const img = document.createElement("img");
        img.style.width = "50%";
        img.style.maxWidth = "400px";
        img.style.margin = "auto";
        img.src = store.image;
        tempdiv.appendChild(img);
        let temptxt = document.createElement("div");
        let temptxt1 = document.createElement("h2");
        let temptxt2 = document.createElement("h2");
        temptxt1.style.textAlign = "center";
        temptxt2.style.textAlign = "center";
        temptxt1.textContent = `Season: ${store.season} Episode: ${store.episode}`;
        temptxt2.textContent = `${store.name}`;
        temptxt.appendChild(temptxt1);
        temptxt.appendChild(temptxt2);
        tempdiv.appendChild(temptxt);
        box.appendChild(tempdiv);
      });
    }
  }
}

function showPics() {
  const images = document.querySelectorAll(".characters img");
  images.forEach((img) => (img.style.display = showpic ? "none" : "block"));
  showpic = !showpic;
}

function setChars() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersDiv = document.getElementById("characters");
  const charactersButDiv = document.getElementById("charactersBut");

  alphabet.split("").forEach((letter) => {
    const head = document.createElement("button");
    head.innerHTML = letter;
    head.onclick = () => open(letter);

    const letterDiv = document.createElement("div");
    letterDiv.id = letter;
    letterDiv.style.display = "none";
    letterDiv.style.flexDirection = "row";
    letterDiv.style.flexWrap = "wrap";

    charactersButDiv.appendChild(head);
    charactersDiv.appendChild(letterDiv);
  });

  characters.forEach((entry) => {
    for (const [key, value] of Object.entries(entry)) {
      const letterDiv = document.getElementById(key);
      value.forEach((character) => {});
    }
  });
}

function open(letter) {
  closeAll();
  const change = document.getElementById(letter);
  change.style.display = "flex";
  change.style.flexDirection = "row";
  change.style.flexWrap = "wrap";
  change.style.justifyContent = "space-evenly";
}

function closeAll() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  alphabet.split("").forEach((letter) => {
    const change = document.getElementById(letter);
    change.style.display = "none";
  });
}
