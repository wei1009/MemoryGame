const gameContainer = document.getElementById("game");
let cardDiv = document.querySelector("card");
let count = 0;
let isGameInprocess = false;
let totalSeconds = 0;
var timer;
let bestGoal = document.getElementById("goal");
let bestRecord = 0;


  bestRecord = JSON.parse(localStorage.getItem("bestRecord"));
  bestGoal.innerText = "Best Time: " + parseTime(bestRecord);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over

    newDiv.setAttribute('color', color);
    newDiv.classList.add("backstyle");
    newDiv.classList.add("card");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  if (!isGameInprocess) {
    return;
  }

  console.log("you just clicked", event.target);


  if (card1 == null) {
    card1 = event.target;
    card1.classList.toggle("backstyle");
    card1.style.backgroundColor = this.classList[0];
    return;
  }
  else if (card2 == null && card1 !== event.target) {
    card2 = event.target;
    card2.classList.toggle("backstyle");
    card2.style.backgroundColor = this.classList[0];
  }
  else {
    return;
  }
  checkMatch()
}


// Check two cards are the same
function checkMatch() {
  let isMatch = (card1.getAttribute('color') == card2.getAttribute('color'));
  isMatch ? cardMatch() : cardNotMatch();
}


//card match
function cardMatch() {
  count++;
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
  card1 = null;
  card2 = null;

  if (count === COLORS.length / 2) {
    clearInterval(timer);
    setTimeout(gameOver, 500);

    saveRecord();
  };


}

//save the record to the localStorage
function saveRecord() {
  bestRecord = JSON.parse(localStorage.getItem("bestRecord"));
  if (bestRecord == null || bestRecord === 0 ) {
    localStorage.setItem("bestRecord", JSON.stringify(totalSeconds));
  }
  else if (totalSeconds < bestRecord) {
    localStorage.setItem("bestRecord", JSON.stringify(totalSeconds));

  }

  bestRecord = JSON.parse(localStorage.getItem("bestRecord"));

  var hour = Math.floor(bestRecord / 3600).toString();
  var minute = Math.floor(Math.floor(bestRecord % 3600) / 60).toString();
  var second = (bestRecord % 60).toString();

  bestGoal.innerText = "Best Time: "
                       + hour.padStart(2, "0") + ":"
                       + minute.padStart(2, "0") + ":"
                       + second.padStart(2, "0");
}


//card didn't match
function cardNotMatch() {
  setTimeout(() => {
    card1.classList.toggle("backstyle");
    card2.classList.toggle("backstyle");
    card1 = null;
    card2 = null;
  }, 300);
}

function startGame() {

  card1 = null;
  card2 = null;
  totalSeconds = 0;
  count = 0;

  bestRecord = JSON.parse(localStorage.getItem("bestRecord"));
  bestGoal.innerText = "Best Time: " + parseTime(bestRecord);


  clearInterval(timer);
  document.getElementById("timer").innerText = "Time Spent: 00:00:00";

  //Clear all cards
  let cards = document.getElementsByClassName("card");

  while (cards.length > 0) {
    cards[0].remove();
  }

  //Generated all cards and random the color
  let colorArr = shuffle(COLORS);
  createDivsForColors(colorArr);


  for (let i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = cards[i].getAttribute('color');
  }
  //Flip all cards for 3 seconds



  timer = window.setInterval("refeshTimer()", 1000);
  isGameInprocess = true;
  start.innerText = "ReStart";

}


function parseTime(second){

  var hour = Math.floor(second / 3600).toString();
  var minute = Math.floor(Math.floor(second % 3600) / 60).toString();
  var second = (second % 60).toString();

  return  hour.padStart(2, "0") + ":" + minute.padStart(2, "0") + ":" + second.padStart(2, "0");
}


function gameOver() {
  alert("You win!");
}



let shuffledColors = shuffle(COLORS);

// when the DOM loads
createDivsForColors(shuffledColors);


let start = document.getElementById("start");
start.addEventListener("click", startGame);



function refeshTimer() {
  if (isGameInprocess) {
    totalSeconds++;


    document.getElementById("timer").innerText = "Time Spent: " + parseTime(totalSeconds);

  }
}
