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
var players = [];
// Dealer logic - input as first index in player array? (but also have logic that tracks dealer's score on their own, to be able to refer to it)

var userName = prompt('What is your name?');

var player1 = new Player(userName);
players.push(player1);

// dealer creation?

// gameplay
var gamePlay = function() {
// taking turns
  for (var i in players){
    players[i].turn();
  }
  // checking scores
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
};

// function calls
// game.Start?
