'use strict';

// Purpose:
// Take Actions
//  Hit or Stay



function Player(ID) {//the player object is an object that when created is passed a string for the player name 
    
  this.ID = ID; //string for player name 
  this.hand = new Hand(); //creates a hand object for the player to use 
  this.playing = false; //boolean, false until the players turn has started, returns to false when the player ends their turn
  this.busted = false; //boolean, determinate of whether that player has busted or not
  this.win = false; //boolean, returns true when 21 is first dealt, or if this.player's score beats the dealer's.score
    
}

// superceded by hit protofunction?
// Player.prototype.dealt = function (card) {
//   this.hand.add(card); 
// };

Player.prototype.turn = function (){
//this method of player is given a choice 
// action = 

this.playing = true;


/* (do while... playing)
code that checks for busted or player choosing to stand
*/

// event listener for player's keypresses on their turn
// to add: score checking 
  let log = console.log;
  window.addEventListener('keypress', (e) => {
    let char = e.char || e.charCode || e.which;
    if (char === 32) {
      // function call back playerHit()
      log('hit me');
      this.hit;
    } else if (char === 13) {
      // function call back playerStand()
      log('stand');
      this.stand;
    }
  });

//prompt('what would you like to do?(h/s)');
  /*eventually change this to an event listener/buttons
        if (action===h){
            this.dealt(deck.deal);
        }*/

};

Player.prototype.hit = function () {
  // this.hand.add(card);
  this.dealt(testDeck.deal);
};

Player.prototype.stand = function() {
  this.playing = false;
};

function Hand(cards, value, bust) {
  this.cards = []; //an array of all cards in the current hand
  this.bust = false; //a boolean that determines whether the current hand is still in play
}


Hand.prototype.add = function(card){
  this.cards.push(card);
  this.value+=card.points;

};

Hand.prototype.value = function(){
  var score = 0;
  for (var i=0 ; i<this.cards.length; i++){
    if (cards[i]==='Ace'){//ace logic to determine 1 or 11
      cards.push(cards.splice(i,1)); 
    }
    score+=cards[i].points;

  }
  return score;
};

// Dealer constructor and logic
function Dealer () {
  this.ID = 'dealer';
  this.hand = new Hand();
  this.playing = false;
  this.busted = false;
  this.win = false;
  this.score = 0;
}

Dealer.prototype = Object.create(Player.prototype);

// Dealer.prototype.turn = ???;
