'use strict';
let log = console.log();

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
//var players = JSON.parse(localStorage.getItem('players'));    USE THIS WHEN LIVE

var players = [new Player('connor', false), new Player('michael', false), new Player('skyler', false)];
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
  // taking turns
  nextPlayer();
  // check scores
  checkScores();
  if (!players[players.length-1].playing){
    var dealerHand=players[players.length-1].hand.score;
    for (var j = 0; j++; j<players.length-1){
      if (!players[j].busted) {
        if (players[j].hand.score>dealerHand){
          console.log(players[j]+' won their hand!');
          players[j].wins++;
        } else if (players[j].hand.value === dealerHand) {
          players[j].wins+=0;
        }else{
          players[j].wins--;
        }
      }
    }
  }
};
var newRound = function (){
  deck = new Deck();
  deck.build();
  deck.shuffle();
  for (var i in players){
    players[i].newGame;
  }
}
var dealcards = function(){
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
  }
  for(var i in players) {
    players[i].hit();
  }
};

var nextPlayer = function(){
  current++;
  if (current<players.length){
    if(!players[current].playing && players[current].hand.blackJack){
      console.log(players[current].ID+' scored blackjack off of the draw!');
      current++;
    }
    console.log(players[current].ID+'s turn, current score: '+players[current].hand.score);
  }
  else{
    current=-1;
  }
}


var testGame = function() {
  console.log(players);
  gamePlay();
};
window.addEventListener('keypress', eventhandler);
// function calls
testGame();
// game.Start?
