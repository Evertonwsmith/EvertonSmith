const body = document.body;
const pages = [];
const characters = document.getElementById('characters');
const charactersButtons = document.getElementById('charactersBut');
const episodes = document.getElementById('episodes');
const sND = document.getElementById('storeNextDoor');
let CHARs = [];
let EPIs = [];
let SNDs = [];

pages.push(characters, episodes, sND, charactersButtons);
let showpic = true;
let index = 1;
let ind = [{ 'characters': 1 }, { 'episodes': 2 }, { 'storeNextDoor': 3 }];
characterPage();

//Fetch character info
// Fetching all characters
fetch('https://bobsburgers-api.herokuapp.com/characters')
    .then(response => response.json())
    .then(data => genCharData(data))
    .catch(error => console.error('Error:', error));

// Fetching all characters
fetch('https://bobsburgers-api.herokuapp.com/episodes')
    .then(response => response.json())
    .then(data => genEpisData(data))
    .catch(error => console.error('Error:', error));

//Fetch store next door 
fetch('https://bobsburgers-api.herokuapp.com/storeNextDoor/')
    .then(response => response.json())
    .then(data => genSND(data))
    .catch(error => console.error('Error:', error));

function setIndex(x) {
    switch (x) {
        case 1: pages.forEach(p => {
            p.style = 'display: none';
        });
            characters.style = 'display: flex;';
            charactersButtons.style = 'display:flex;';
            break;
        case 2: pages.forEach(p => {
            p.style = 'display: none';
        });
            episodes.style = 'display: flex';
            break;
        case 3: pages.forEach(p => {
            p.style = 'display: none';
        });
            sND.style = 'display: flex';
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
        let name = character.name;
        name = name.replace(/['"]/g, '');
        const letter = name.charAt(0).toUpperCase();

        if (!characterData[letter]) {
            characterData[letter] = [];
        }
        characterData[letter].push(character);
    });

    for (const char in characterData) {
        let obj = {};
        obj[char] = characterData[char];
        CHARs.push(obj);
    }
    console.log(CHARs); // This is just to verify the result in the console
    setChars();
}

function genEpisData(data) {
    let seasonData = {};

    data.forEach(episode => {
        const season = episode.season;

        if (!seasonData[season]) {
            seasonData[season] = [];
        }

        seasonData[season].push(episode);
    });

    for (const season in seasonData) {
        let obj = {};
        obj[season] = seasonData[season];
        EPIs.push(obj);
    }

}
function sea(seasonIndex) {
    let box = document.getElementById('tableDataEpi');
    box.innerHTML = ''; // Clear existing content

    if (seasonIndex >= 0 && seasonIndex < EPIs.length) {
        let season = EPIs[seasonIndex];
        for (let seasonKey in season) {
            season[seasonKey].forEach(store => {
                let text = document.createElement('h2');
                text.textContent = store.name;
                box.appendChild(text);
            });
        }
    }
}

function genSND(data) {
    let seasonData = {};

    data.forEach(snd => {
        const season = snd.season;

        if (!seasonData[season]) {
            seasonData[season] = [];
        }

        seasonData[season].push(snd);
    });

    for (const season in seasonData) {
        let obj = {};
        obj[season] = seasonData[season];
        SNDs.push(obj);
    }

}
function snd(seasonIndex) {
    let box = document.getElementById('tableData');
    box.innerHTML = ''; // Clear existing content

    if (seasonIndex >= 0 && seasonIndex < SNDs.length) {
        let season = SNDs[seasonIndex];
        for (let seasonKey in season) {
            season[seasonKey].forEach(store => {
                let text = document.createElement('img');
                text.style = 'width:50%;max-width:400px;margin:50px';
                text.src = store.image;
                box.appendChild(text);
            });
        }
    }
}

function showPics() {
    const images = document.querySelectorAll('.characters img');
    if (!showpic) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'block';
        }
    }
    if (showpic) {
        for (let i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    }
    showpic = !showpic;
}
function setChars() {
    // Set characters under first name letter
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    //The box characters are in
    const charactersDiv = document.getElementById('characters');
    const charactersButDiv = document.getElementById('charactersBut');

    alphabet.split('').forEach(letter => {
        //top of container title
        let head = document.createElement('button');
        head.innerHTML = letter;
        head.onclick = () => open(letter);

        const letterDiv = document.createElement('div');
        letterDiv.id = letter;
        letterDiv.style = 'display:none;flex-direction:row;flex-wrap:wrap;';

        charactersButDiv.appendChild(head);
        charactersDiv.appendChild(letterDiv);
    });

    CHARs.forEach(entry => {
        for (const [key, value] of Object.entries(entry)) {
            const letterDiv = document.getElementById(key);
            value.forEach(character => {

                const charElement = document.createElement('div');
                charElement.style = 'background-color:rgba(255, 252, 127,.2);border-radius:10%;margin:3%;width:400px;display:flex;flex-direction:column;justify-content:center;text-align:center';
                // charElement.textContent = character.name;
                const text = document.createElement('h2');
                text.innerHTML = character.name
                text.style = 'text-align:center;padding:5px;margin:5px;'
                charElement.appendChild(text);
                const image = document.createElement('img');
                image.src = character.image;
                image.style = 'width:50px;margin:auto;object-fit:cover;';
                charElement.appendChild(image);
                letterDiv.appendChild(charElement);

            });
        }
    });
}
function open(letter) {
    closeAll();
    const change = document.getElementById(letter);
    change.style = 'display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-evenly;';
}

function closeAll() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    alphabet.split('').forEach(letter => {
        const change = document.getElementById(letter);
        change.style = 'display:none;flex-direction:row;flex-wrap:wrap;';
    });
}