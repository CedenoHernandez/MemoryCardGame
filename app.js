//const variables
const allCards = document.querySelectorAll('.card');
const cards = [...allCards];
const deck = document.querySelector('.deck');
const counter = document.querySelector('.moves');
const goldStars = document.querySelectorAll('.fa-star');
const timer = document.querySelector('.timer');
const allDone = document.querySelector('.modal');
const button = document.querySelector('button');

//let variables
let totalClicks = 0;
let totalMatched = [];
let stars = 3;
let moves = 0;
let seconds = 0;
let minutes = 0;
let openedCards = [];
let flippedCard = null;
let replay = document.querySelector('.restart');
let zeroTimer = 0;

window.onload = beginGame();
window.onload = startTimer();

//allows every card to be clicked and then turned over with flipCard()
allCards.forEach(allCards => allCards.addEventListener('click', flipCard));

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

//turns cards over and checks for a match; if there is no match, flips back over
function flipCard() {
    this.classList.add('open', 'show');
    openedCards.push(1);
    if (flippedCard && openedCards.length == 1) { //checks if there is a match once 2 cards are flipped over
      if (!matchCard(flippedCard, this)) {
        setTimeout(() => {
          this.classList.remove('open', 'show');
          flippedCard.classList.remove('open', 'show');
          flippedCard = null;
          openedCards = []; //resets array to ensure line 47 works again
        }, 1100); //so cards don't immediately disappear
      }
    } else {
      flippedCard = this;
      moveCounter();
      starRating();
      openedCards = []; // resets array to ensure line 47 works again
      }
};


function beginGame() {
  let shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item) {
      deck.appendChild(item);
    });
  }
}


function matchCard(card1, card2) {
    if (card1.firstElementChild.className === card2.firstElementChild.className && card1 != card2) {
    card1.classList.add('match');
    card2.classList.add('match');
    totalMatched.push(1); // each 1 represents a paired match in the array
    endGame();
    return true
  } else return false
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}

function starRating() {
  if (moves === 11) {  // the number of moves for stars can be changed to make the game more difficult
    stars = "3 stars";
  } else if (moves > 11 && moves <= 15) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        goldStars[i].style.visibility = "collapse";
      }
    }
    stars= "2 stars";
  } else if (moves > 16) {
     for (i = 0; i < 3; i++) {
       if (i > 0) {
         goldStars[i].style.visibility = "collapse";
       }
     }
    stars = "1 star";
  }
}


timer.innerHTML = "(0 mins, 0 secs)"; //display the timer on page

function startTimer() {
  interval = setInterval(function(){
    timer.innerHTML = "(" + minutes + " mins, " + seconds + " secs)";
  if (zeroTimer !== 1) {
    seconds++;
  }
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

//allows user to restart game via reload sign at top
replay.addEventListener('click', function() {
  location.reload();
  moves = 0;
  stars = 3;
  seconds = 0;
  minutes = 0;
});


function endGame() {
  if (totalMatched.length == 8) { //checks to see if all cards have been matched before launching modal and endgame
    clearInterval(interval);
    finalTime = timer.innerHTML;
    allDone.style.display = "block";
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = stars;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeModal();
  };
}

function closeModal() {  // lets user play game again
    button.addEventListener("click", function(e){
        allDone.style.display = "none";
        beginGame();
        location.reload();
        moves = 0;
        stars = 0;
        seconds = 0;
        minutes = 0;
    });
}
