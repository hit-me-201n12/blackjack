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

var userName; //= prompt('What is your name?');
//var dealer = new Player('Dealer', true);
var player1 = new Player(userName, false);
var player2 = new Player('Bill', false);
// players.push(dealer);
players.push(player1);
players.push(player2);
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
  console.log(deck);


  // deal the cards
  for(var i in players) {
    players[i].hit();
  }
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
  }

  // taking turns
  for (var k in players){
    players[k].turn();
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

var testGame = function() {
  gamePlay();
}

// function calls
testGame();
// game.Start?
