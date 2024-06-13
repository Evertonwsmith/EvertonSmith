// Cache DOM elements
const pages = [];

const navDiv = document.getElementById("navBar");
const belchersDiv = document.getElementById("belchers");
const belchersTitle = document.getElementById("belcherstitle");
const charactersDiv = document.getElementById("characters");
const charactersList = document.getElementById("charactersList");
const episodesDiv = document.getElementById("episodes");
const storeNextDoorDiv = document.getElementById("storeNextDoor");
const pestControlTruckDiv = document.getElementById("pestControlTruck");
const burgerOfTheDayDiv = document.getElementById("burgerOfTheDay");
const pageTitleDiv = document.getElementById("pageTitle");
const showPictureButton = document.getElementById("showPics");
let sortedEpisodes = [];
let characters = [];
let charactersraw = [];
let episodesraw = [];
let belchers;
let episodes = [];
let storeNextDoors = [];
let pestControlTrucks = [];
let burgerOfTheDays = [];
let showPicturesBool = true;
let nameCorrections = [];
let charactersByEpisode = [];

pages.push(
  navDiv,
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

Promise.all(
  fetchUrls.map((url) => fetch(url).then((response) => response.json()))
)
  .then(([charData, episData, sndData, pcvData, botdData]) => {
    charactersraw = charData;
    episodesraw = episData;
    generateCharacterData(charData);
    generateEpisodeData(episData);
    generateStoreNextDoorData(sndData);
    generatePestControlVanData(pcvData);
    generateBurgerOfTheDayData(botdData);
    console.log("Charactersraw:");
    console.log(charactersraw);
    console.log("Episodesraw:");
    console.log(episodesraw);
    console.log("StoreNextDoor:");
    console.log(storeNextDoors);

    // Step 1: Create a lookup for episodes
    const episodeLookup = {};
    episodesraw.forEach((episode) => {
      episodeLookup[episode.name] = {
        season: episode.season,
        episode: episode.episode,
        episodeId: episode.id,
        episodeName: episode.name,
      };
    });

    // Step 2: Map characters to their first appearance episode details
    const charactersWithEpisodeDetails = charactersraw.map((character) => {
      const episodeDetails = episodeLookup[character.firstEpisode] || {
        season: Infinity,
        episode: Infinity,
        episodeName: "Unknown",
      };
      return {
        ...character,
        firstSeason: episodeDetails.season,
        firstEpisodeNumber: episodeDetails.episode,
        firstEpisodeId: episodeDetails.episodeId,
        firstEpisodeName: episodeDetails.episodeName,
      };
    });

    // Step 3: Group characters by their first appearance episode
    const charactersByEpisode = {};
    charactersWithEpisodeDetails.forEach((character) => {
      const episodeKey = `${character.firstSeason}-${character.firstEpisodeNumber}`;
      if (!charactersByEpisode[episodeKey]) {
        charactersByEpisode[episodeKey] = {
          season: character.firstSeason,
          episode: character.firstEpisodeNumber,
          episodeName: character.firstEpisodeName,
          characters: [],
        };
      }
      charactersByEpisode[episodeKey].characters.push(character);
    });

    // Step 4: Sort episodes
    sortedEpisodes = Object.values(charactersByEpisode).sort((a, b) => {
      if (a.season === b.season) {
        return a.episode - b.episode;
      }
      return a.season - b.season;
    });

   

    /**
     *
     *
     *
     *
     * initial
     */

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
function returnToMain() {
  setIndex(6);
}

function setIndex(index) {
  pages.forEach((p) => (p.style.display = "none"));

  switch (index) {
    case 1:
      //SHOW CHARACTERS HIDE ELSE
      charactersDiv.style.display = "flex";
      charactersDiv.style.flexDirection = "column";
      charactersList.innerHTML = '';
      setBelchers();
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
      navDiv.style.display = "flex";
      navDiv.style.flexDirection = "column";
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
  belchersDiv.innerHTML = "";
  let louisebelcher = findCharacter("L", "Louise Belcher", characters);
  let tinabelcher = findCharacter("T", "Tina Belcher", characters);
  let bobbelcher = findCharacter("B", "Bob Belcher", characters);
  let lindabelcher = findCharacter("L", "Linda Belcher", characters);
  let genebelcher = findCharacter("G", "Gene Belcher", characters);

  let louiseDiv = createBelcherDiv(louisebelcher);
  let tinaDiv = createBelcherDiv(tinabelcher);
  let bobDiv = createBelcherDiv(bobbelcher);
  let lindaDiv = createBelcherDiv(lindabelcher);
  let geneDiv = createBelcherDiv(genebelcher);

  belchersDiv.appendChild(louiseDiv);
  belchersDiv.appendChild(tinaDiv);
  belchersDiv.appendChild(bobDiv);
  belchersDiv.appendChild(lindaDiv);
  belchersDiv.appendChild(geneDiv);
  belchersDiv.style.display = "flex";
  belchersTitle.style.display = "block";
}

function createBelcherDiv(belcher) {
  let newDiv = document.createElement("div");
  newDiv.className = "belcherDiv";
  let newImage = document.createElement("img");
  newImage.className = "belcherImg";
  // newDiv.onclick = characterSelect(belcher);
  newImage.src = belcher.image;
  newDiv.appendChild(newImage);
  let newText = document.createElement("h3");
  newText.className = "belchertext";
  newText.innerHTML = belcher.name;
  newDiv.appendChild(newText);
  return newDiv;
}

function charactersByAppearance() {
    charactersList.innerHTML = '';
  belchersDiv.style.display = "none";
  belchersTitle.style.display = "none";
   // Step 5: Iterate through sorted episodes and their characters
   sortedEpisodes.forEach(({ season, episode, episodeName, characters }) => {
    console.log(`Season ${season}, Episode ${episode}: ${episodeName}`);
    let header = document.createElement('h2');
    header.innerHTML = `S:${season} / E:${episode}: ${episodeName}`;
    charactersList.appendChild(header);
    characters.forEach((character) => {
      console.log(` - ${character.name}`);
      let tempDiv = document.createElement('div');
      tempDiv.className = 'characterBox1';
      let tempname = document.createElement('h5');
      tempname.innerHTML = `${character.name}`;
      let temppic = document.createElement('img');
      temppic.src = character.image;
      tempDiv.appendChild(tempname);
      tempDiv.appendChild(temppic);
      charactersList.appendChild(tempDiv);
    });
  });
}

function setCharacter(characterCode, characterName, bgColor) {
  let character = findCharacter(characterCode, characterName, characters);
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

function characterIntros(episodeName) {
  let characterList = [];
  let episodeString = episodeName.replace(/"/g, "");
  for (let letter of characters) {
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
 *
 *
 *
 *
 * GENERATORS
 *
 * GENERATORS
 *
 * GENERATORS
 *
 * GENERATORS
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
