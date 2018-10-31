'use strict';

// Purpose:
// Starting Game
//  Create Players
//    (take and store player names)
//    (dealer-player creation)
//   Calls Deck creation
//   Prompting Deck to deal cards to Players to start game
//      (ie. Dealer and 1 player to start)
// Handle Turn Order
//    Iterates over players

// Global Vars
var players = JSON.parse(localStorage.getItem('players')); // USE THIS WHEN LIVE
console.log(players);
// var players = [new Player('connor', false), new Player('michael', false), new Player('skyler', false)];
var current = -1;
//create a dealer and push him to position 0 in players
players.push(new Player('Dealer', true));
//Create deck for the game
var deck;

var eventhandler = function(press) { //this is our event handler for hitting and staying.
  if (!players[current].dealer===true){//condition, only use keyboard for hit and stay if not the dealer
    if (players[current].playing){//condition, only hit or stay if the current player is still playing
      let key = press.char || press.charCode || press.which;
      if (key === 32) { //if the user presses space:
        players[current].hit();//player is dealt a card
        // Check to see if player has busted or blackJack to set 'playing' to false
        if(players[current].blackJack){
          players[current].playing = false;
          nextPlayer();
        } else if(players[current].busted) {//if the player busts, they are also no longer playing
          players[current].playing = false;
          nextPlayer();
        }
      } else if (key === 13) {// if user presses enter
      // function call back playerStand()
        players[current].stay();
        nextPlayer();
      }
    }
  }

};





// gameplay
var gamePlay = function() {
  //Write something to clear/reset all players objects (hand, and booleans)
  newRound();
  // deal the cards
  dealcards();
  // taking turns checking scores
  nextPlayer();
};

var newRound = function (){
  deck = new Deck();
  deck.build();
  deck.shuffle();
  for (var i in players){
    players[i].newGame;
  }
};

var dealcards = function(){
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
    console.log(players[j]);
  }
  for(var i in players) {
    players[i].hit();
    console.log(players[i]);
  }
};

var nextPlayer = function(){
  current++;
  console.log(players[current].ID+'s turn, current score: '+players[current].hand.score);
  //console.log(players[current]+'s turn, score: '+players[current].hand.score);
  if(players[current].dealer){//if the current player is the dealer
    window.removeEventListener('keypress', window);
    var dPlay=true;
    while(dPlay===true){
      if(players[current].hand.score<17){
        players[current].hit();
      }else if (players[current].hand.score === 17 && players[current].hand.aces>0){
        players[current].hit;
      }else if(players[current].hand.score===17){
        console.log('dealerStay');
        players[current].stay;
        dPlay=false;
        break;
      }else{
        console.log('dealerStay');
        players[current].stay;
        dPlay=false;
        break;
      }
    }
    current--;
    checkScores();
  }else if (current<players.length-1){
    window.addEventListener('keypress', eventhandler);
    if(!players[current].playing && players[current].hand.blackJack){
      console.log(players[current].ID+' scored blackjack off of the draw!');
      current++;
    } else {
      current=-1;
    }
  }
};

var checkScores = function(){
  console.log(current);
  if (!players[players.length-1].playing){
    var dealerbust= (players[players.length-1].busted);
    var dealerScore = players[players.length-1].hand.score;
    if (!players[current].bust){
      if (players[current].hand.score>dealerScore||dealerbust){
        players[current].wins++;
        console.log(players[current]+' won their hand.');
      }else if (players[current].hand.score===dealerScore){
        players[current].wins+=0;
      }else{
        players[current].wins--;
      }
    }else{
      console.log(players[current]+' lost their hand.');
    }
    if (current>-1){
      checkScores();
    }
  }
};


var testGame = function() {
  console.log(players);
  gamePlay();
};
// pop up function
var showRules = function () {
  var popup = document.getElementById('popUp') // select the HTML div box & assign to 'popup'
  popup.classList.toggle('appear') // call classList.toggle DOM method on popup element. This DOM method creates a class with the name of the string value passed as an argument. In the CSS, a selector named .popUpRules .appear exists already. When we create this class and toggle it on popup, it activates the CSS block that styles the popup. One of the properties is visibility: visible. So showRules() takes the element in its existing state of visibility: hidden to the new state of visibility: visible. With a z-index, it appears on top of other elements.
}
// function calls
testGame();
