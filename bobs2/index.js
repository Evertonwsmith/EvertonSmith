// Cache DOM elements
const pages = [];

const charactersDiv = document.getElementById("characters");
const episodesDiv = document.getElementById("episodes");
const storeNextDoorDiv = document.getElementById("storeNextDoor");
const pestControlTruckDiv = document.getElementById("pestControlTruck");
const burgerOfTheDayDiv = document.getElementById("burgerOfTheDay");
const focusDiv = document.getElementById("focus");
const pageTitleDiv = document.getElementById("pageTitle");
const showPictureButton = document.getElementById("showPics");

let characters = [];
let belchers;
let episodes = [];
let storeNextDoors = [];
let pestControlTrucks = [];
let burgerOfTheDays = [];
let showPicturesBool = true;
let nameCorrections = [];

pages.push(
  charactersDiv,
  episodesDiv,
  storeNextDoorDiv,
  pestControlTruckDiv,
  burgerOfTheDayDiv,
  focusDiv
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
function focus() {
  setIndex(6);
}

function setIndex(index) {
  pages.forEach((p) => (p.style.display = "none"));

  switch (index) {
    case 1:
      //SHOW CHARACTERS HIDE ELSE
      charactersDiv.style.display = "flex";
      charactersDiv.style.flexDirection = "row";
      charactersDiv.innerHTML = "";
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
    case 6:
      //focus
      focusDiv.style.display = "flex";
      focusDiv.style.flexDirection = "column";
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
function setBelchers() {
  setLouise();
  setLinda();
  setBob();
  setGene();
  setTina();
}
function setCharacter(characterCode, characterName, bgColor) {
  let character = findCharacter(characterCode, characterName, characters);
  let characterDiv = makeCharacterDiv();
  characterDiv.className = "characterBox";
  characterDiv.style.backgroundColor = bgColor;
  let characterImage = document.createElement("img");
  characterImage.src = character.image;
  characterImage.className = 'characterBoxImage';
  characterDiv.appendChild(characterImage);
  let characterNameElement = document.createElement("h3");
  characterNameElement.innerHTML = character.name;
  let characterInfo = document.createElement("p");
  characterInfo.style.display = 'none';
  characterInfo.innerHTML = `Occupation: ${character.occupation}</p>
  <p>Voiced By: ${character.voicedBy}</p>`;
  characterDiv.appendChild(characterNameElement);
  characterDiv.appendChild(characterInfo);
  characterDiv.onclick = function () {
    focusThis(characterCode, character.name);
  };
  charactersDiv.appendChild(characterDiv);
}

function focusThis(characterCode, characterName) {
  focusDiv.innerHTML = "";
  console.log("FOCUS CHARACTER:" + characterCode + " // " + characterName);
  let character = findCharacter(characterCode, characterName, characters);
  let focusCharacterBox = document.createElement("div");
  focusCharacterBox.className = "focusCharacterBox";
  let backButton = document.createElement("div");
  backButton.className = "backButton";
  backButton.innerHTML = "Return";
  backButton.onclick = function () {
    characterPage();
    setBelchers();
  };
  focusCharacterBox.appendChild(backButton);
  let image = document.createElement("img");
  image.className = "focusImg";
  image.src = character.image;
  let text = document.createElement("div");
  text.className = "focusText";
  let textName = document.createElement("h1");
  textName.innerHTML = character.name;
  text.appendChild(textName);
  let relativesString = document.createElement("p");
  let relativesStringTitle = document.createElement("h2");
  relativesStringTitle.innerHTML = "Relatives";
  relativesString.appendChild(relativesStringTitle);
  let relativeLink;
  character.relatives.forEach((relative) => {
    if (findCharacter(relative.name.charAt(0), relative.name, characters)) {
      relativeLink = document.createElement("p");
      relativeLink.className = "characterLink";
      relativeLink.innerHTML = relative.name;
      relativeLink.onclick = function () {
        focusThis(relative.name.charAt(0), relative.name);
        return false; // Prevent default link behavior
      };
    } else {
      relativeLink = document.createElement("p");
      relativeLink.innerHTML = relative.name;
    }
    relativesString.appendChild(relativeLink);
    relativesString.appendChild(document.createTextNode(" ")); // Add a space between names
  });

  let firstEpisode = document.createElement("h2");
  firstEpisode.className = "firstEpisodeLink";
  firstEpisode.innerHTML = `First Episode: ${character.firstEpisode}`;
  firstEpisode.onclick = function () {
    focusEpisode(character.firstEpisode, character);
  };

  text.appendChild(relativesString);
  focusCharacterBox.appendChild(image);
  focusCharacterBox.appendChild(text);
  focusCharacterBox.appendChild(firstEpisode);
  focusDiv.appendChild(focusCharacterBox);
  focus();
}

function focusEpisode(episodeName, character) {
  console.log("FROM : " + character.name);
  console.log("FOCUS Episode:" + episodeName + " // from" + character.name);
  let episode = findEpisode(episodeName);
  if(episode){
    focusDiv.innerHTML = "";
  }
  let focusEpisodeBox = document.createElement("div");
  focusEpisodeBox.className = "focusEpisodeBox";
  let backButton = document.createElement("div");
  backButton.className = "backButton";
  backButton.innerHTML = "Return";
  backButton.onclick = function () {
    characterPage();
    focusThis(character.name.charAt(0), character.name);
  };
  let episodeText = document.createElement("p");
  episodeText.innerHTML = `<h1>${episode.name}</h1>
  <p>Air Date: ${episode.airDate}</p>
  <p>Total Viewers: ${episode.totalViewers}</p>
  <p>Season ${episode.season} Episode ${episode.episode}`;

  let pestControl = findBySeasonEpisode(
    episode.season,
    episode.episode,
    pestControlTrucks
  );
  let pestControlTitle = document.createElement("h2");
  pestControlTitle.innerHTML = `Pest Control Van:<br>${pestControl.name}`;
  let pestControlImage = document.createElement("img");
  pestControlImage.className = "focusPestControlImage";
  console.log(episode);
  pestControlImage.src = pestControl.image;

  let storeNextDoor = findBySeasonEpisode(
    episode.season,
    episode.episode,
    storeNextDoors
  );
  let storeNextDoorTitle = document.createElement("h2");
  storeNextDoorTitle.innerHTML = `Store Next Door Name:<br>${storeNextDoor.name}`;
  let storeNextDoorImage = document.createElement("img");
  storeNextDoorImage.className = "focusstoreNextDoorImage";
  console.log(episode);
  storeNextDoorImage.src = storeNextDoor.image;

  let burgerOfTheDay = findBySeasonEpisode(
    episode.season,
    episode.episode,
    burgerOfTheDays
  );
  let burgerOfTheDayTitle = document.createElement("h2");
  burgerOfTheDayTitle.innerHTML = `Burger Of The Day:<br>${burgerOfTheDay.name}`;
  let burgerOfTheDayImage = document.createElement("img");
  burgerOfTheDayImage.className = "focusburgerOfTheDayImage";
  console.log(episode);
  burgerOfTheDayImage.src = burgerOfTheDay.image;

  let tempCharList = characterIntros(episode.name);
  console.log("TEMPLST: "+tempCharList);
  
  focusEpisodeBox.appendChild(backButton);
  focusEpisodeBox.appendChild(episodeText);
  focusEpisodeBox.appendChild(pestControlTitle);
  focusEpisodeBox.appendChild(pestControlImage);
  focusEpisodeBox.appendChild(storeNextDoorTitle);
  focusEpisodeBox.appendChild(storeNextDoorImage);
  focusEpisodeBox.appendChild(burgerOfTheDayTitle);
  focusEpisodeBox.appendChild(burgerOfTheDayImage);
  
  focusDiv.appendChild(focusEpisodeBox);

  focus();
}



function setLouise() {
  setCharacter("L", "Louise Belcher", "rgba(200,100,100,.9)");
}

function setLinda() {
  setCharacter("L", "Linda Belcher", "rgba(200,200,100,.9)");
}

function setBob() {
  setCharacter("R", 'Robert "Bob" Belcher, Jr.', "rgba(255,255,255,.9)");
}

function setGene() {
  setCharacter("G", "Gene Belcher", "rgba(100,100,200,.9)");
}

function setTina() {
  setCharacter("T", "Tina Ruth Belcher", "rgba(200,100,200,.9)");
}

function makeCharacterDiv() {
  let result = document.createElement("div");
  result.className = 'makeCharacterDiv'; return result;
}

function findCharacter(firstLetter, name, array) {
  const matchingGroup = array.find((obj) => obj[firstLetter]);

  if (matchingGroup) {
    // Extract the array of characters associated with the firstLetter
    const characters = matchingGroup[firstLetter];

    // Search for the character within the characters array
    return (
      characters.find((character) => character.name === name) || findName(name)
    );
  }

  return null; // Return null if not found
}

function findEpisode(episodeName) {
  for (const season of episodes) {
    for (const seasonNumber in season) {
      const seasonEpisodes = season[seasonNumber];
      for (const episode of seasonEpisodes) {
        console.log("EPISODE TRY: " + episode.name);
        console.log("EPISODE SEARCH " + episodeName);
        episode.name = episode.name.replace(/"/g, "");
        episodeName = episodeName.replace(/"/g, "");
        if (episode.name.includes(episodeName)) {
          return episode;
        }
      }
    }
  }
  return null; // Return null if no episode with the given name is found
}

function characterIntros(episodeName){
  let characterList = [];
  let episodeString = episodeName.replace(/"/g, "");
  for(let letter of characters){
    console.log(letter);
    
  }

  return characterList; // Return null if no episode with the given name is found
}

function findBySeasonEpisode(seasonNumber, episodeNumber, array) {
  for (const season of array) {
    if (season.hasOwnProperty(seasonNumber)) {
      const seasonEpisodes = season[seasonNumber];
      for (const info of seasonEpisodes) {
        if (info.episode === episodeNumber) {
          return info;
        }
      }
    }
  }
  return null; // Return null if no episode with the given season and episode number is found
}

function findName(name) {
  console.log("FINDING NAME " + name);
  switch (name) {
    case "Bob Belcher":
      console.log("returning Bob");
      return findCharacter("R", `Robert "Bob" Belcher, Jr.`, characters);
      break;
    case "Tina Belcher":
      return findCharacter("T", "Tina Ruth Belcher", characters);
      break;
  }
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
