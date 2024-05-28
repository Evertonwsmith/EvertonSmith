function workData() {
  const box = document.getElementById("data");
  let title = document.getElementById("dataTitle");
  title.innerHTML = "Work and Past Projects";
  let wrap = document.getElementById("dataArea");
  wrap.style.display = "flex";
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
  Array.from(wrap.childNodes).forEach((x) => wrap.removeChild(x));
  getExpData(wrap);
}

function aboutData() {
  const box = document.getElementById("data");
  let title = document.getElementById("dataTitle");
  title.innerHTML = "About Me";
  let wrap = document.getElementById("dataArea");
  wrap.style.display = "flex";
  Array.from(wrap.childNodes).forEach((x) => wrap.removeChild(x));
  getAboutData();
}

function makeCard(x, y, z) {
  let card = document.createElement("div");
  card.className = "card";
  card.style.width = "20%";

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

  wrap.appendChild(card1);
  wrap.appendChild(card2);
  wrap.appendChild(card3);
  wrap.appendChild(card4);
  // <a href="newindex.html">
  //   <div class="workexamplecard">
  //     <img src="images/index2.jpg" alt="index2" class="workcardimg">
  //     <p>Iteration 2 of website</p>
  //   </div>
  // </a>

  // <a href="javascript1.html">
  //   <div class="workexamplecard">
  //     <img src="images/memgame.jpg" alt="memgame" class="workcardimg">
  //     <p>JS Memory Game</p>
  //   </div>
  // </a>

  // <a href="https://evertonsmith-848dd.web.app/">
  //   <div class="workexamplecard">
  //     <img src="images/dart1.jpg" alt="dart1" class="workcardimg">
  //     <p>Dart Homepage</p>
  //   </div>
  // </a>
}
