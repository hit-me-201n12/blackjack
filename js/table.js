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

var players = [new Player('connor', false), new Player('michael', false), new Player('skyler', true)];
var current = -1;
//create a dealer and push him to position 0 in players
players.push = new Player('Dealer', true);
//Create deck for the game
var deck;

var eventhandler = function(press) { //this is our event handler for hitting and staying.
  if (!players[current].dealer){//condition, only use keyboard for hit and stay if not the dealer
    if (players[current].playing){//condition, only hit or stay if the current player is still playing
      let key = press.char || press.charCode || press.which;
      if (key === 32) { //if the user presses space:
        console.log(players[current].ID+' hit');
        players[current].hit();//player is dealt a card
        console.log (players[current].hand.score);
        // Check to see if player has busted or blackJack to set 'playing' to false
        if(players[currrent].blackJack){
          players[currrent].playing = false;
        } else if(players[currrent].busted) {//if the player busts, they are also no longer playing
          players[currrent].playing = false;
        }
      } else if (key === 13) {// if user presses enter
      // function call back playerStand()
        console.log('stand');
        players[current].stay();
      }
    }
    if (!players[current].playing){
      current++;
    }
  }
};





// gameplay
var gamePlay = function() {
  //Write something to clear/reset all players objects (hand, and booleans)

  //Makes sure the deck is reset
  deck = new Deck();
  deck.build();
  deck.shuffle();
  // deal the cards
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
  }
  for(var i in players) {
    players[i].hit();
  }
  // taking turns
  current++;
  console.log(players[current].ID+'s turn');
  // check scores
  if (!players[players.length-1].playing){
    for (var j = 0; j++; j<players.length-1){
      if (!players[j].busted) {
        if (players[j].hand.score>players[players.length-1].hand.score){
          console.log(players[j]+' won their hand!');
        } else if (players[j].hand.value === hiScore) {
        // generate a 'push' round result
        }
      }
    }
    // we'll need to check the winner's score against the dealer's, declare winner if not dealer
    console.log(winner);
  }
};

var testGame = function() {
  gamePlay();
};
window.addEventListener('keypress', eventhandler);
// function calls
testGame();
// game.Start?
