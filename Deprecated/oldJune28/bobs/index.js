// Cache DOM elements
const body = document.body;
const pages = [];
const characters = document.getElementById("characters");
const charactersButtons = document.getElementById("charactersBut");
const episodes = document.getElementById("episodes");
const sND = document.getElementById("storeNextDoor");
const pageTitle = document.getElementById("pageTitle");
const showP = document.getElementById("showPics");

let CHARs = [];
let EPIs = [];
let SNDs = [];
let showpic = true;

pages.push(characters, episodes, sND, charactersButtons);

const fetchUrls = [
  "https://bobsburgers-api.herokuapp.com/characters",
  "https://bobsburgers-api.herokuapp.com/episodes",
  "https://bobsburgers-api.herokuapp.com/storeNextDoor/"
];

// Initial page setup
characterPage();

Promise.all(fetchUrls.map(url => fetch(url).then(response => response.json())))
  .then(([charData, episData, sndData]) => {
    genCharData(charData);
    genEpisData(episData);
    genSND(sndData);
    // Hide loading indicator and show content
  })
  .catch(error => console.error("Error fetching data:", error));

function setIndex(index) {
  pages.forEach(p => p.style.display = "none");

  switch (index) {
    case 1:
      characters.style.display = "flex";
      charactersButtons.style.display = "flex";
      pageTitle.innerHTML = "<h1>Characters</h1>";
      showP.style.display = "flex";
      break;
    case 2:
      episodes.style.display = "flex";
      pageTitle.innerHTML = "<h1>Seasons and Episodes</h1>";
      showP.style.display = "none";
      break;
    case 3:
      sND.style.display = "flex";
      pageTitle.innerHTML = "<h1>Store Next Door</h1>";
      showP.style.display = "none";
      break;
  }
}

function characterPage() {
  setIndex(1);
}
function episodesPage() {
  setIndex(2);
}
function storeNextDoor() {
  setIndex(3);
}

function genCharData(data) {
  const characterData = {};

  data.forEach(character => {
    const letter = character.name.replace(/['"]/g, "").charAt(0).toUpperCase();

    if (!characterData[letter]) {
      characterData[letter] = [];
    }
    characterData[letter].push(character);
  });

  for (const letter in characterData) {
    CHARs.push({ [letter]: characterData[letter] });
  }
  console.log(CHARs); // For debugging
  setChars();
}

function genEpisData(data) {
  const seasonData = {};

  data.forEach(episode => {
    const season = episode.season;

    if (!seasonData[season]) {
      seasonData[season] = [];
    }
    seasonData[season].push(episode);
  });

  for (const season in seasonData) {
    seasonData[season].sort((a, b) => a.episode - b.episode);
    EPIs.push({ [season]: seasonData[season] });
  }
}

function sea(seasonIndex) {
  const box = document.getElementById("tableDataEpi");
  box.innerHTML = ""; // Clear existing content

  if (seasonIndex >= 0 && seasonIndex < EPIs.length) {
    const season = EPIs[seasonIndex];

    for (const seasonKey in season) {
      season[seasonKey].forEach(epi => {
        const text = document.createElement("h2");
        text.innerHTML = `<br><br><br>${epi.name}`;

        const text2 = document.createElement("div");
        text2.style.display = 'flex';
        text2.style.flexDirection = 'column';
        text2.style.alignContent = 'center';
        text2.style.padding = '25px';
        text2.style.backgroundColor = 'rgba(20,250,0,.2)';
        text2.innerHTML = `<h3> Season: ${epi.season} Episode: ${epi.episode}</h3>
                           <p>Air Date: ${epi.airDate}</p>
                           <p>Total Viewers: ${epi.totalViewers}</p>`;

        box.appendChild(text);
        box.appendChild(text2);
      });
    }
  }
}

function genSND(data) {
  const seasonData = {};

  data.forEach(snd => {
    const season = snd.season;

    if (!seasonData[season]) {
      seasonData[season] = [];
    }
    seasonData[season].push(snd);
  });

  for (const season in seasonData) {
    seasonData[season].sort((a, b) => a.episode - b.episode);
    SNDs.push({ [season]: seasonData[season] });
  }
}

function snd(seasonIndex) {
  const box = document.getElementById("tableData");
  box.innerHTML = ""; // Clear existing content

  if (seasonIndex >= 0 && seasonIndex < SNDs.length) {
    const season = SNDs[seasonIndex];

    for (const seasonKey in season) {
      season[seasonKey].forEach(store => {
        const tempdiv = document.createElement('div');
        tempdiv.style = 'display:flex;flex-direction:column;justify-content:center;margin:10px;';
        const img = document.createElement("img");
        img.style.width = "50%";
        img.style.maxWidth = "400px";
        img.style.margin = "auto";
        img.src = store.image;
        tempdiv.appendChild(img);
        let temptxt = document.createElement('div');
        let temptxt1 = document.createElement("h2");
        let temptxt2 = document.createElement("h2");
        temptxt1.style.textAlign = 'center';
        temptxt2.style.textAlign = 'center';
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
  images.forEach(img => img.style.display = showpic ? "none" : "block");
  showpic = !showpic;
}

function setChars() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersDiv = document.getElementById("characters");
  const charactersButDiv = document.getElementById("charactersBut");

  alphabet.split("").forEach(letter => {
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

  CHARs.forEach(entry => {
    for (const [key, value] of Object.entries(entry)) {
      const letterDiv = document.getElementById(key);
      value.forEach(character => {
        const charElement = document.createElement("div");
        charElement.style.backgroundColor = "rgba(255, 252, 127,.2)";
        charElement.style.borderRadius = "10%";
        charElement.style.margin = "3%";
        charElement.style.width = "400px";
        charElement.style.display = "flex";
        charElement.style.flexDirection = "column";
        charElement.style.justifyContent = "center";
        charElement.style.textAlign = "center";

        const text = document.createElement("h2");
        text.innerHTML = character.name;
        text.style.textAlign = "center";
        text.style.padding = "5px";
        text.style.margin = "5px";
        charElement.appendChild(text);

        const image = document.createElement("img");
        image.src = character.image;
        image.style.width = "50px";
        image.style.margin = "auto";
        image.style.objectFit = "cover";
        charElement.appendChild(image);

        const infoDiv = document.createElement("div");
        infoDiv.style.flexDirection = "column";
        infoDiv.style.justifyContent = "center";
        infoDiv.style.width = '80%';
        infoDiv.style.margin = 'auto';
        infoDiv.innerHTML = `
          <p>First Appearance: ${character.firstEpisode}</p>
          <p>Occupation: ${character.occupation}</p>
          <p>Voiced By: ${character.voicedBy}</p>`;
        charElement.appendChild(infoDiv);

        letterDiv.appendChild(charElement);
      });
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
  alphabet.split("").forEach(letter => {
    const change = document.getElementById(letter);
    change.style.display = "none";
  });
}
