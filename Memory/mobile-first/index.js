let playPlayerBtn = document.querySelector('.play-player');
let playComputerBtn = document.querySelector('.play-computer');
let computerLvlEasyBtn = document.querySelector('.lvl-easy');
let computerLvlHardBtn = document.querySelector('.lvl-hard');
let startComputerBtn = document.querySelector('.startComputer');
let startPlayerBtn = document.querySelector('.startPlayer');

let inputP1 = document.querySelector('#spelare1input');
let inputP2 = document.querySelector('#spelare2input');
let inputP3 = document.querySelector('#spelare3input');


let scoreP1 = document.querySelector('.spelare1poäng');
let scoreP2 = document.querySelector('.spelare2poäng');

let reset = document.querySelector('.reset');
let quit = document.querySelector('.quit');

let history = document.querySelector('.history-content')

let startMenu = document.querySelector('#menu');
let playerMenu = document.querySelector('#player-menu');
let computerMenu = document.querySelector('#computer-menu')
let game = document.querySelector('#game');
let gameBox = document.querySelector('.game-box');
let gameRound = document.querySelector('.game-round');

let pointsP1 = 0;
let pointsP2 = 0;
let pointsP3 = 0;
let pointsPc = 0;
let difficultyEasy = false;
let turn = false;
let timesClicked = 0;

let input1;
let input2;
let input3;

let cardsClickedArray = [];


playPlayerBtn.addEventListener('click', event => {
    event.preventDefault();
    startMenu.style.display = 'none';
    playerMenu.style.display = 'flex';

    startPlayerBtn.addEventListener('click', event => {
        event.preventDefault();
        input1 = inputP1.value;
        input2 = inputP2.value;

        if (input1 === "" || input2 === "") {
            return;
        }

        playerMenu.style.display = 'none';
        game.style.display = 'flex';

        scoreP1.textContent = input1 + ': ' + pointsP1;
        scoreP2.textContent = input2 + ': ' + pointsP2;
        currentPlayer = input1;
        scoreP1.style.color = "green";

        let gameSound = new Audio('../pokemon-sounds/Encounter.mp3');
        gameSound.volume = 0.1;

        quit.addEventListener('click', event => {
            location.reload();
        });

        reset.addEventListener('click', event => {
            pointsP1 = 0;
            scoreP1.textContent = input1 + ': ' + pointsP1;
            pointsP2 = 0;
            scoreP2.textContent = input2 + ': ' + pointsP2;
            history.innerHTML = '';

            gameBox.innerHTML = '';
            createCards();
        })
        createCards();
    });
});

playComputerBtn.addEventListener('click', event => {
    event.preventDefault();
    startMenu.style.display = 'none';
    computerMenu.style.display = 'flex';

    computerLvlEasyBtn.addEventListener('click', event => {
        difficultyEasy = true;
        console.log(difficultyEasy);
    });

    computerLvlHardBtn.addEventListener('click', event => {
        difficultyEasy = false;
        console.log(difficultyEasy);
    });

    startComputerBtn.addEventListener('click', event => {
        event.preventDefault();
        input3 = inputP3.value;
        if (input3 === "") {
            return;
        }
        computerMenu.style.display = 'none';
        game.style.display = 'flex';

        scoreP1.textContent = input3 + ': ' + pointsP3;
        scoreP2.textContent = 'Gary Oak' + ': ' + pointsPc;
        currentPlayer = input3;

        quit.addEventListener('click', event => {
            location.reload();
        });

        reset.addEventListener('click', event => {
            
            gameBox.innerHTML = '';
            createCards();
        })
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

const createCards = () => {
    const pictureData = randomize();
    pictureData.forEach((item) => {

        //Skapa Behållare för kortframsida och baksida
        let card = document.createElement("div")
        card.className = "card";
        card.setAttribute("name", item.name);

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

        card.addEventListener('click', (event) => {
            if (card.className === "card toggleCard") {

            } else {
                card.classList.toggle('toggleCard');
                timesClicked++;
                console.log(timesClicked);
                checkCards(event);
                takingturns();
                /*cardsClicked(card); */
            }
        });
    });
};



const checkCards = (e) => {
    const clickedCard = e.target;
    cardsClickedArray.push(clickedCard);
};

function takingturns() {

    if (timesClicked === 2) {
        let tmpClickedCards = [...cardsClickedArray];
        cardsClickedArray = [];

        if (tmpClickedCards[0].attributes.name.value === tmpClickedCards[1].attributes.name.value) {
            console.log(tmpClickedCards[0].attributes.name.value);
            console.log(tmpClickedCards[1].attributes.name.value);
            if (!turn) {
                pointsP1++
                scoreP1.textContent = input1 + ': ' + pointsP1;
                turn = false;
                timesClicked = 0;
                addToHistory(input1);
                allPointsTaken(input1);
                return;
            } else {
                pointsP2++
                scoreP2.textContent = input2 + ': ' + pointsP2;
                turn = true;
                timesClicked = 0;
                addToHistory(input2);
                allPointsTaken(input2);
                return;
            }
        }
        else {
            tmpClickedCards.forEach(card => {
                setTimeout(function () {
                    card.classList.toggle("toggleCard");
                }, 1500);
            });
        }

        if (turn) {
            scoreP1.style.color = "green";
            scoreP2.style.color = "black";
            turn = false;
            timesClicked = 0;
        } else {
            scoreP2.style.color = "green";
            scoreP1.style.color = "black";
            turn = true;
            timesClicked = 0;
        }

    }
}

function addToHistory(player){
    let historyElement = document.createElement('p');
    historyElement.textContent = player + " found a pair!";
    historyElement.className = "historyElement";
    history.append(historyElement);
}

function allPointsTaken(player){
    if(pointsP1 + pointsP2 === 18){
            let historyElement = document.createElement('p');
            historyElement.textContent = player + " has won!";
            historyElement.className = "historyElement";
            history.append(historyElement);
    }

}

function FunctionHej(){
    console.log("card");
}


/*function cardsClicked(card){
    console.log(cardsClickedArray, "Array");
    if(timesClicked > 1){
        
            if(cardsClickedArray[0].classList.value === "card toggleCard" && cardsClickedArray[0].classList.value === cardsClickedArray[1].classList.value){
                console.log("inside");

            }
        timesClicked = 0;
        console.log(timesClicked);
        
    } else {
        console.log(card, "Kort som läggs till i Array");
        cardsClickedArray.push(card);
        timesClicked++;
        console.log(timesClicked);
    }
}*/







/*

function pokemonIsClicked(clickedCard){
    console.log(clickedCard);
    
    let img = clickedCard.querySelector('.face');
    console.log(img);
    
    if(img.getAttribute('src') === "../pokemon-icons/Pikachu.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    } 
    else if (img.getAttribute('src') === "../pokemon-icons/Alakazam.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Charizard.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Articuno.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Blastoise.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Dragonite.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Gengar.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Gyarados.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Lapras.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Lugia.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Machamp.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/masterball.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Mewtwo.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Moltres.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Poliwrath.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Snorlax.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Venusaur.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
    else if (img.getAttribute('src') === "../pokemon-icons/Zapdos.png"){
        let pikachuSound = new Audio('../pokemon-sounds/')
        pikachuSound.play();
    }
};

*/