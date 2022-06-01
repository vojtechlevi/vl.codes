let playPlayerBtn = document.querySelector(".play-player");
let playComputerBtn = document.querySelector(".play-computer");
let computerLvlEasyBtn = document.querySelector(".lvl-easy");
let computerLvlHardBtn = document.querySelector(".lvl-hard");
let startComputerBtn = document.querySelector(".startComputer");
let startPlayerBtn = document.querySelector(".startPlayer");

let inputP1 = document.querySelector("#spelare1input");
let inputP2 = document.querySelector("#spelare2input");
let inputP3 = document.querySelector("#spelare3input");

let scoreP1 = document.querySelector(".spelare1poäng");
let scoreP2 = document.querySelector(".spelare2poäng");

let reset = document.querySelector(".reset");
let quit = document.querySelector(".quit");

let history = document.querySelector(".history-content");

let startMenu = document.querySelector("#menu");
let playerMenu = document.querySelector("#player-menu");
let computerMenu = document.querySelector("#computer-menu");
let game = document.querySelector("#game");
let gameBox = document.querySelector(".game-box");
let gameRound = document.querySelector(".game-round");
let gameSound = document.querySelector(".pokeTheme");

let pointsP1 = 0;
let pointsP2 = 0;
let pointsP3 = 0;
let pointsPc = 0;
let difficultyEasy = true;
let timesClicked = 0;
let cardId = 0;

let input1;
let input2;
let input3;

let clickedCardsArray = [];
let cardsArray = [];
let botMemory = [];
let pairs = {};

playPlayerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  startMenu.style.display = "none";
  playerMenu.style.display = "flex";

  startPlayerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    input1 = inputP1.value;
    input2 = inputP2.value;

    if (input1 === "" || input2 === "") {
      return;
    }

    playerMenu.style.display = "none";
    game.style.display = "flex";

    scoreP1.textContent = input1 + ": " + pointsP1;
    scoreP2.textContent = input2 + ": " + pointsP2;
    currentPlayer = input1;
    scoreP1.style.color = "green";

    quit.addEventListener("click", (event) => {
      location.reload();
    });

    reset.addEventListener("click", (event) => {
      pointsP1 = 0;
      scoreP1.textContent = input1 + ": " + pointsP1;
      pointsP2 = 0;
      scoreP2.textContent = input2 + ": " + pointsP2;
      history.innerHTML = "";

      gameBox.innerHTML = "";
      createCards();
    });
    createCards();
  });
});

playComputerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  startMenu.style.display = "none";
  computerMenu.style.display = "flex";

  computerLvlEasyBtn.addEventListener("click", (event) => {
    difficultyEasy = true;
  });

  computerLvlHardBtn.addEventListener("click", (event) => {
    difficultyEasy = false;
  });

  startComputerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    input1 = inputP3.value;

    if (input1 === "") {
      return;
    }

    computerMenu.style.display = "none";
    game.style.display = "flex";

    //Sätter Spelarens start poäng
    scoreP1.textContent = input1 + ": " + pointsP1;

    //Sätter datorns start poäng
    input2 = "Gary Oak";
    scoreP2.textContent = input2 + ": " + pointsP2;

    //Bestämmer spelaren som börjar
    currentPlayer = input1;
    scoreP1.style.color = "green";

    createCards();

    quit.addEventListener("click", (event) => {
      location.reload();
    });

    reset.addEventListener("click", (event) => {
      pointsP1 = 0;
      scoreP1.textContent = input1 + ": " + pointsP1;
      pointsP2 = 0;
      scoreP2.textContent = input2 + ": " + pointsP2;
      history.innerHTML = "";
      pairs = {};

      gameBox.innerHTML = "";
      createCards();
    });
  });
});

//Hämta array av bilder
const getPictures = () => [
  { imgSrc: "../pokemon-icons/Alakazam.png", name: "alakazam" },
  { imgSrc: "../pokemon-icons/Articuno.png", name: "articuno" },
  { imgSrc: "../pokemon-icons/Blastoise.png", name: "blastoise" },
  { imgSrc: "../pokemon-icons/Charizard.png", name: "charizard" },
  { imgSrc: "../pokemon-icons/Dragonite.png", name: "dragonite" },
  { imgSrc: "../pokemon-icons/Gengar.png", name: "gengar" },
  { imgSrc: "../pokemon-icons/Gyarados.png", name: "gyarados" },
  { imgSrc: "../pokemon-icons/Lapras.png", name: "lapras" },
  { imgSrc: "../pokemon-icons/Lugia.png", name: "lugia" },
  { imgSrc: "../pokemon-icons/Machamp.png", name: "machamp" },
  { imgSrc: "../pokemon-icons/masterball.png", name: "masterball" },
  { imgSrc: "../pokemon-icons/Mewtwo.png", name: "mewtwo" },
  { imgSrc: "../pokemon-icons/Moltres.png", name: "moltres" },
  { imgSrc: "../pokemon-icons/Pikachu.png", name: "pikachu" },
  { imgSrc: "../pokemon-icons/Poliwrath.png", name: "poliwrath" },
  { imgSrc: "../pokemon-icons/Snorlax.png", name: "snorlax" },
  { imgSrc: "../pokemon-icons/Venusaur.png", name: "venusaur" },
  { imgSrc: "../pokemon-icons/Zapdos.png", name: "zapdos" },
  { imgSrc: "../pokemon-icons/Alakazam.png", name: "alakazam" },
  { imgSrc: "../pokemon-icons/Articuno.png", name: "articuno" },
  { imgSrc: "../pokemon-icons/Blastoise.png", name: "blastoise" },
  { imgSrc: "../pokemon-icons/Charizard.png", name: "charizard" },
  { imgSrc: "../pokemon-icons/Dragonite.png", name: "dragonite" },
  { imgSrc: "../pokemon-icons/Gengar.png", name: "gengar" },
  { imgSrc: "../pokemon-icons/Gyarados.png", name: "gyarados" },
  { imgSrc: "../pokemon-icons/Lapras.png", name: "lapras" },
  { imgSrc: "../pokemon-icons/Lugia.png", name: "lugia" },
  { imgSrc: "../pokemon-icons/Machamp.png", name: "machamp" },
  { imgSrc: "../pokemon-icons/masterball.png", name: "masterball" },
  { imgSrc: "../pokemon-icons/Mewtwo.png", name: "mewtwo" },
  { imgSrc: "../pokemon-icons/Moltres.png", name: "moltres" },
  { imgSrc: "../pokemon-icons/Pikachu.png", name: "pikachu" },
  { imgSrc: "../pokemon-icons/Poliwrath.png", name: "poliwrath" },
  { imgSrc: "../pokemon-icons/Snorlax.png", name: "snorlax" },
  { imgSrc: "../pokemon-icons/Venusaur.png", name: "venusaur" },
  { imgSrc: "../pokemon-icons/Zapdos.png", name: "zapdos" },
];

//Blanda arrayen av bilder
const randomize = () => {
  const pictureData = getPictures();
  pictureData.sort(() => Math.random() - 0.5);
  return pictureData;
};

//Skapar alla korten, med en click eventlistener
const createCards = () => {
  const pictureData = randomize();
  pictureData.forEach((item) => {
    //Skapa Behållare för kortframsida och baksida

    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("name", item.name);
    card.setAttribute("id", cardId);

    //Skapa kortframsidan
    let cardFrontImg = document.createElement("img");
    cardFrontImg.src = item.imgSrc;
    cardFrontImg.className = "face";

    //Skapa kortbaksidan
    let cardBackImg = document.createElement("img");
    cardBackImg.src = "../pokemon-icons/background.png";
    cardBackImg.className = "back";

    /**
     * <div class="card">
     *  <img src="bild.jpeg" class="back"/>
     *  <img src="bild2.jpeg" class="face"/>
     * </div>
     */
    card.append(cardBackImg);
    card.append(cardFrontImg);
    gameBox.append(card);
    cardsArray.push(card);

    card.addEventListener("click", (event) => {
      if (!(currentPlayer === "Gary Oak")) {
        if (card.className === "card toggleCard") {
        } else {
          card.classList.toggle("toggleCard");
          timesClicked++;
          clickedCards(card);
        }
      }
    });
    cardId++;
  });
};

//Lägger till de 2 klickade korten i en array och skickar viadare den
function clickedCards(passedCard) {
  const clickedCard = passedCard;
  clickedCardsArray.push(clickedCard);
  checkPair(clickedCardsArray);
}

//Kollar om de två korten är matchande
function checkPair(arrayToCheck) {
  if (timesClicked === 2) {
    let tmpClickedCardsArray = [...arrayToCheck];
    clickedCardsArray = [];
    if (
      tmpClickedCardsArray[0].attributes.name.value ===
      tmpClickedCardsArray[1].attributes.name.value
    ) {
      addScore(tmpClickedCardsArray[0].attributes.name.value);
      timesClicked = 0;
      delete pairs[tmpClickedCardsArray[0].attributes.name.value]; //Om ett par hittas, tas det bort ur bottens minne
      if (currentPlayer === "Gary Oak") {
        setTimeout(function () {
          bot();
        }, 3000);
      }
    } else {
      turnNonPairs(tmpClickedCardsArray);
      takingTurns();
      timesClicked = 0;
      if (currentPlayer === "Gary Oak") {
        setTimeout(function () {
          bot();
        }, 3000);
      }
    }
  }
}

//Om korten inte matchade byter denna funktion vems tur ddedt är
function takingTurns() {
  if (currentPlayer === input1) {
    currentPlayer = input2;
    scoreP2.style.color = "green";
    scoreP1.style.color = "black";
  } else if (currentPlayer === "Gary Oak") {
    currentPlayer = input1;
    scoreP1.style.color = "green";
    scoreP2.style.color = "black";
  } else {
    currentPlayer = input1;
    scoreP1.style.color = "green";
    scoreP2.style.color = "black";
  }
}

//Om korten matchar lägger denna funktion till poäng för currentPlayer
function addScore(cardName) {
  if (currentPlayer === input1) {
    if (cardName === "masterball") {
      pointsP1 = pointsP1 + 2;
    } else {
      pointsP1++;
    }
    scoreP1.textContent = input1 + ": " + pointsP1;
  } else if (currentPlayer === input2) {
    if (cardName === "masterball") {
      pointsP2 = pointsP2 + 2;
    } else {
      pointsP2++;
    }
    scoreP2.textContent = input2 + ": " + pointsP2;
  }
  addToHistory(currentPlayer);
  winner();
}

//Om korten inte matchar vänder denna funktion tillbaka korten
function turnNonPairs(array) {
  array.forEach((card) => {
    setTimeout(function () {
      card.classList.toggle("toggleCard");
    }, 1500);
  });
}

//Om korten matchar lägger denna funktionen till att någon har fått ett par i historiken
function addToHistory(player) {
  let historyElement = document.createElement("p");
  historyElement.className = "historyElement";
  historyElement.textContent = player + " found a pair!";
  history.append(historyElement);
}

//När poängen når 19 så kommer en vinnare utses
function winner() {
  let allPoints = pointsP1 + pointsP2;
  if (allPoints === 19) {
    let winner;
    if (pointsP1 > pointsP2) {
      winner = input1;
    } else {
      winner = input2;
    }
    let historyElement = document.createElement("p");
    historyElement.textContent = winner + " has won!";
    historyElement.className = "historyElement";
    history.append(historyElement);
  }
}

//Denna funktion sparar alla kort som botten vänt på
function trackPair(name, id) {
  if (!pairs[name]) {
    //Här kollar vi om kortet har upptäckats sedan tidigare
    pairs[name] = new Set(); //Skapar en tom lista med unika värden
  }
  pairs[name].add(id); //Lägger positionen på kortet (set hindrar samma position två gånger)
}

//Denna funktion hämtar korten från pairs och kollar om det finns två lika, annars slumpar dden två nya kort.
function bot() {
  let i = 0;
  let randomNum;

  if (difficultyEasy) {
    let randomSmartness = Math.random(); //mellan 0 till 1
    if (randomSmartness > 0.8) {
      let key = Object.keys(pairs).find((key) => pairs[key].size === 2);
      if (key) {
        cardsArray.forEach((element) => {
          if (element.attributes.name.value === key) {
            element.classList.toggle("toggleCard");
            timesClicked++;
            clickedCards(element);
          }
        });
      } else {
        do {
          do {
            randomNum = Math.floor(Math.random() * cardsArray.length);
          } while (cardsArray[randomNum].classList.value === "card toggleCard");

          cardsArray[randomNum].classList.toggle("toggleCard");
          timesClicked++;
          clickedCards(cardsArray[randomNum]);
          trackPair(
            cardsArray[randomNum].attributes.name.value,
            cardsArray[randomNum].id
          );
          i++;
        } while (i < 2);
      }
    } else {
      do {
        do {
          randomNum = Math.floor(Math.random() * cardsArray.length);
        } while (cardsArray[randomNum].classList.value === "card toggleCard");

        cardsArray[randomNum].classList.toggle("toggleCard");
        timesClicked++;
        clickedCards(cardsArray[randomNum]);
        trackPair(
          cardsArray[randomNum].attributes.name.value,
          cardsArray[randomNum].id
        );
        i++;
      } while (i < 2);
    }
  } else if (!difficultyEasy) {
    let randomSmartness = Math.random(); //mellan 0 till 1
    if (randomSmartness > 0.2) {
      let key = Object.keys(pairs).find((key) => pairs[key].size === 2);
      if (key) {
        cardsArray.forEach((element) => {
          if (element.attributes.name.value === key) {
            element.classList.toggle("toggleCard");
            timesClicked++;
            clickedCards(element);
          }
        });
      } else {
        do {
          do {
            randomNum = Math.floor(Math.random() * cardsArray.length);
          } while (cardsArray[randomNum].classList.value === "card toggleCard");

          cardsArray[randomNum].classList.toggle("toggleCard");
          timesClicked++;
          clickedCards(cardsArray[randomNum]);
          trackPair(
            cardsArray[randomNum].attributes.name.value,
            cardsArray[randomNum].id
          );
          i++;
        } while (i < 2);
      }
    } else {
      do {
        do {
          randomNum = Math.floor(Math.random() * cardsArray.length);
        } while (cardsArray[randomNum].classList.value === "card toggleCard");

        cardsArray[randomNum].classList.toggle("toggleCard");
        timesClicked++;
        clickedCards(cardsArray[randomNum]);
        trackPair(
          cardsArray[randomNum].attributes.name.value,
          cardsArray[randomNum].id
        );
        i++;
      } while (i < 2);
    }
  }
}
