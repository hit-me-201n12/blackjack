'use strict';

// Purpose:
// Take Actions
//  Hit or Stay



function Player(ID, dealer) {//the player object is an object that when created is passed a string for the player name
  this.ID = ID; //string for player name 
  this.hand = new Hand(); //creates a hand object for the player to use 
  this.playing = false; //boolean, false until the players turn has started, returns to false when the player ends their turn
  this.busted = false; //boolean, determinate of whether that player has busted or not
  this.win = false; //boolean, returns true when 21 is first dealt, or if this.player's score beats the dealer's.score
  this.dealer = dealer;
}

// superceded by hit protofunction?
// Player.prototype.dealt = function (card) {
//   this.hand.add(card); 
// };

Player.prototype.turn = function (){
  //Set player status to playing
  this.playing = true;
  if(this.dealer){
    //dealer logic
  } else {
    //Player logic below
    //Event listener for keystrokes
    let log = console.log;
    window.addEventListener('keypress', (e) => {
      let char = e.char || e.charCode || e.which;
      if (char === 32) {
        // function call back playerHit()
        log('hit me');
        this.hit();
        // Check to see if player has busted or blackJack to set 'playing' to false
        if(this.blackJack){
          this.playing = false;
        } else if(this.busted) {
          this.playing = false;
        };
      } else if (char === 13) {
        // function call back playerStand()
        log('stand');
        this.stand();
      };
    });
  }
};

Player.prototype.hit = function () {
  this.hand.add(deck.deal());
};

Player.prototype.stand = function() {
  this.playing = false;
};

function Hand() {
  this.cards = []; //an array of all cards in the current hand
  this.bust = false; //a boolean that determines whether the current hand is still in play
  this.value = 0;
  this.blackJack = false;
}


Hand.prototype.add = function(card){
  this.cards.push(card);
  this.value+=card.points;
  if(this.value > 21) {
    this.bust = true;
  } else if(this.value === 21) {
    this.blackJack = true;
  }
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
