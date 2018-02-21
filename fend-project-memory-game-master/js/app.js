
let card = document.getElementsByClassName("card"); /* to get list of cards */
let cards = [...card];  /* using spread operator */
let openedCards = [];  /* array to hold openedcards */
const deck = document.querySelector(".deck"); /* query selector to get deck elements */
let matchedCard = document.getElementsByClassName("match"); /* matching cards */
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let modal = document.getElementById("congo");

/* function to open cards and check whethet matching or not */
function cardOpen(){
    openedCards.push(this);
    var len = openedCards.length;
        if (len === 2) {
            moveCounter();
        if(openedCards[0].children[0].classList[1] === openedCards[1].children[0].classList[1]){
            matched();
        }
        else{
            unmatched();
        }
    }

};

 /* Display the cards on the page */
 function displayCard(){
     this.classList.toggle("open");
     this.classList.toggle("show");
     this.classList.toggle("disabled");
 }
 for(var i = 0; i < cards.length; i++){
     cards[i].addEventListener("click", displayCard); /* eventListeners */
     cards[i].addEventListener("click", cardOpen);
     cards[i].addEventListener("click", congratulations); 
    };


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
}

/* function to move counter  */
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTime();
    }
    if (moves > 10 && moves < 20 ){
        for (var i = 0; i < 3; i++){
            if (i > 1){
                stars[i].style.visibility = "collapse";
            }
        }

    }
    else if(moves > 20){
        for (var i = 0 ; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

/* calculate time */
var hour = 0; minute = 0; second = 0;
var timer = document.querySelector(".timer");
var interval;
function startTime(){
    interval = setInterval(function(){
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);

}

/*Load game function when browser is laoded */
function LoadGame(){
    var shuffledCards = shuffle(cards);
    for(var i =0 ; i < shuffledCards.length; i++){
        deck.removeChild(shuffledCards[i]);
    }
    for(var i = 0 ; i < shuffledCards.length; i++){
            deck.appendChild(shuffledCards[i]);
            cards[i].classList.remove("show","open","match","disabled");
    }
    moves = 0;
    counter.innerHTML = moves;
    for(var i = 0; i < stars.length; i++){
        stars[i].style.color = "#FFC107";
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

/* functions for matched and unmatched */
 function matched(){
     openedCards[0].classList.add("match");
     openedCards[1].classList.add("match");
     openedCards[0].classList.remove("show", "open");
     openedCards[1].classList.remove("show", "open");
     openedCards = [];
 }

 function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show" ,"open", "unmatched");
        enable();
        openedCards = [];
    },1100);
 }

 function disable(){
     Array.prototype.filter.call(cards, function(card){
         card.classList.add("disabled");
     });
 }

 function enable(){
     Array.prototype.filter.call(cards,function(card){
         card.classList.remove("disabled");
         for(var i = 0; i < matchedCard.length; i++){
             matchedCard[i].classList.add("disabled");
         }
     });
 }

 /* function to display at the end of the game */
 function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("move").innerHTML = moves;
        document.getElementById("time").innerHTML = timer.innerHTML;
        modal.style.visibility = "visible";
    };
}

function playAgain(){
    modal.classList.remove("show");
    LoadGame();
    modal.style.visibility = "hidden";
}

  window.onload = LoadGame();
