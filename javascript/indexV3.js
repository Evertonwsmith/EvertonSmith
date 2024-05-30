let sections = [];
function workData() {
  const box = document.getElementById("data");
  let title = document.getElementById("dataTitle");
  title.innerHTML = "Work and Past Projects";
  let wrap = document.getElementById("dataArea");
  wrap.style.display = "flex";
  const width = window.innerWidth;
  wrap.style.flexDirection = 'column';
  if (width > 900) {
    wrap.style.flexDirection = 'row';
  }
  wrap.style.display = 'row';
  wrap.style.justifyContent = "space-evenly";
  Array.from(wrap.childNodes).forEach((x) => wrap.removeChild(x));
  genWorkData(wrap);
}

function expData() {
  const box = document.getElementById("data");
  let title = document.getElementById("dataTitle");
  title.innerHTML = "Professional Experience";
  let wrap = document.getElementById("dataArea");
  wrap.style.display = "flex";
  wrap.style.flexDirection = "column";
  Array.from(wrap.childNodes).forEach((x) => wrap.removeChild(x));
  sections = [];
  getExpData(wrap);
}

function aboutData() {
  const box = document.getElementById("data");
  let title = document.getElementById("dataTitle");
  title.innerHTML = "About Me";
  let wrap = document.getElementById("dataArea");
  wrap.style.display = "flex";
  wrap.style.flexDirection = "column";
  Array.from(wrap.childNodes).forEach((x) => wrap.removeChild(x));
  genAboutData(wrap);
}

function getExpData(wrap) {
  let sec1 = makeSection(
    null,
    null,
    "Software Developer with five years of professional experience working on" +
    "      a Cloud based S.a.a.S.." +
    "      Familiar with Git, Kubernetes and Docker, as well as many development" +
    "      languages with a personal interest" +
    "      in cross platform web application development. Ability to demonstrate" +
    "      knowledge in adeptly managing customer issues," +
    "      implementing efficient and secure code, and improving operations through" +
    "      the use of automation and thorough testing.<br><br><br><br>"
  );

  let sec2 = makeSection(
    "Experience",
    "Ultimate Kronos Group - Back-End Developer. November 2019 - Present",
    "- Engineered and maintained Java code for a Cloud Based Software as a Service" +
    "<br><br>- Collaborated with support teams to resolve customer and internally" +
    "reported issues" +
    "<br><br>- Actively engaged in agile development methodologies, including daily" +
    "standups, sprint planning, and retrospective meetings" +
    "<br><br>- Stayed up to date on code security and integrity taking internal" +
    "training courses" +
    "<br><br>- Employed automation and Java frameworks like Spring Boot to develop" +
    "scalable software solutions, optimizing performance<br><br><br><br>"
  );

  let sec3 = makeSection(
    "Skills",
    "Programming Languages",
    "Java, Javascript, Dart, React, Python, and more"
  );
  let sec4 = makeSection(null, "Web Development", "HTML, CSS, JS, Bootstrap");
  let sec5 = makeSection(
    null,
    "Database Languages",
    "PostgreSQL, MySQL, MongoDB, NoSQL"
  );
  let sec6 = makeSection(null, "Version Control", "Git");
  let sec7 = makeSection(
    null,
    "IDEs",
    "IntelliJ, Eclipse, Android Studio, Visual Studio Code, and more"
  );
  for (let x of sections) {
    wrap.appendChild(x);
  }
}


function genWorkData(wrap) {
  let card1 = makeCard("newindex.html", "images/index2.jpg", "Website V1.2");
  let card2 = makeCard("index1.html", "images/index1.jpg", "Website V1.1");
  let card3 = makeCard(
    "https://evertonsmith-848dd.web.app/",
    "images/dart1.jpg",
    "Dart/Flutter Homepage"
  );
  let card4 = makeCard(
    "javascript1.html",
    "images/memgame.jpg",
    "JS Memory Game"
  );

  // let card5 = makeCard(
  //   'threejs/test1.html','images/PL1.jpg','Three.JS'
  // );
  wrap.appendChild(card1);
  wrap.appendChild(card2);
  wrap.appendChild(card3);
  wrap.appendChild(card4);
  // wrap.appendChild(card5);
}

function genAboutData(wrap) {
  let banner1 = makeBanner('images/Everton1.jpg',

    'I loved video games at a young age, being introduced to the' +
    '      original playstation in my youth. I was then introduced' +
    '      to computer gaming, and ultimately coding. This, combined with having' +
    'strong math skills, lead me to persue a degree in Computer Science.<br><br><br><br>');


  let banner2 = makeBanner('images/Everton4.jpg', 'Growing up I was involved with various sports, with a main' +
    + 'concentration on golf and hockey<br><br><br><br>');

  let banner3 = makeBanner('images/Everton2.jpg', 'At age 13 I decided to learn guitar, teaching myself and' +
    'joining my schools band program.' +
    'I continued, and ended up having a successful jazz career in high school,' +
    'competing at nation levels, playing payed gigs, and winning various awards' +
    'in small group combos.' +
    'I still play as a way to express myself, and to keep my brain active in a' +
    'way I love.');



  wrap.appendChild(banner1);
  wrap.appendChild(banner2);
  wrap.appendChild(banner3);
}

function makeBanner(x, y) {
  let banner = document.createElement('div');
  banner.className = 'banner';
  const width = window.innerWidth;
  banner.style.width = '80%';
  let image = document.createElement('img');
  let text = document.createElement('p');
  image.src = x;
  text.innerHTML = y;
  text.style = '';
  if (width > 900) {
    banner.style = 'display: flex; flex-direction:column;justify-content: center; align-content: center;';
    image.style = 'width: 80%; max-width: 400px; margin: auto;';
    text.style = 'text-align:center;fontSize: clamp(16px,3vw,22px); color:white; width:60%;margin:auto;padding:50px;';

  } else {
    banner.style = 'display: flex; flex-direction:column;justify-content: center; align-content: center;';
    image.style = 'width: 80%; max-width: 400px; margin: auto;';
    text.style = 'text-align:center;fontSize: clamp(16px,3vw,22px); color:white;';

  }

  banner.appendChild(image);
  banner.appendChild(text);
  return banner;
}
function makeCard(x, y, z) {
  let card = document.createElement("div");
  card.className = "card";
  const width = window.innerWidth;
  card.style.width = "20%";
  if (width < 900) {
    card.style.width = "70%";
  }

  let link = document.createElement("a");
  let image = document.createElement("img");
  let text = document.createElement("p");

  link.href = x;
  image.src = y;
  text.innerHTML = z;

  card.style.margin = "20px";
  link.style.textAlign = "center";
  image.style.borderRadius = "5px";
  image.style.width = "100%";
  link.style.textDecoration = "none";
  link.style.color = "white";
  link.appendChild(image);
  link.appendChild(text);
  card.appendChild(link);

  return card;
}

function makeSection(title, text, sec) {
  let section = document.createElement("div");
  let titl = document.createElement("h2");
  let txt = document.createElement("p");
  let txt2;

  section.style.color = "white";
  section.style.width = "70%";
  section.style.margin = "auto";
  section.className = title + "CN";

  titl.innerHTML = title;
  txt.innerHTML = text;
  txt.style.color = "rgb(10, 150, 40)";
  txt.style.fontSize = 'clamp(10px,4vw,20px)';

  section.appendChild(titl);
  section.appendChild(txt);
  if (sec !== null) {
    txt2 = document.createElement("p");
    txt2.innerHTML = sec;
    // txt2.style.fontFamily = 'Arial';
    txt2.style.lineHeight = "2";
    txt2.style.fontWeight = '400';
    txt2.style.fontSize = 'clamp(10px,4vw,20px)';
    section.appendChild(txt2);
  }
  sections.push(section);
  return section;
}
