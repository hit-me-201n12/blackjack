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


var eventhandler = function(press) {
  //if (players[current]){
  if (players[current].playing){
    let key = press.char || press.charCode || press.which;
    if (key === 32) { //if the user presses space
      console.log(players[current].ID+' hit');
      players[current].hit();
      console.log (players[current].hand.score);
      // Check to see if player has busted or blackJack to set 'playing' to false
      if(this.blackJack){
        this.playing = false;
      } else if(this.busted) {
        this.playing = false;
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
  //}
};
<<<<<<< HEAD
=======




// Dealer logic - input as first index in player array? (but also have logic that tracks dealer's score on their own, to be able to refer to it)

//var dealer = new Player('Dealer', true);
var player1 = new Player('userName', false);
var player2 = new Player('Bill', false);
// players.push(dealer);
players.push(player1);
players.push(player2);
>>>>>>> da7900fd91eab41cd02c24d38b1ace6095495d79
// dealer creation?

//Create deck for the game
var deck;

// gameplay
var gamePlay = function() {
  //Write something to clear/reset all players objects (hand, and booleans)

  //Makes sure the deck is reset
  deck = new Deck();
  deck.build();
  deck.shuffle();
  // deal the cards
  for(var i in players) {
    players[i].hit();
  }
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
  }

  // taking turns
  current++;
  console.log(players[current].ID+'s turn');


  // checking scores
  if (!players[players.length-1].playing){
    for (var j in players){
      var hiScore = 0;
      var winner;
      if (!players[j].busted) {
        if (players[j].hand.value>hiScore){
          hiScore = players[j].hand.value;
          winner = players[j].ID;
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
