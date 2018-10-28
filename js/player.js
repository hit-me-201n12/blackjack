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

Player.prototype.hit = function () {
  this.hand.add(deck.deal());
  if (this.hand.bust){
    this.playing = false;
  }
  if (this.hand.blackJack){
    this.playing=false;
  }
};

Player.prototype.stay = function() {
  this.playing = false;
};

function Hand() {
  this.cards = []; //an array of all cards in the current hand
  this.bust = false; //a boolean that determines whether the current hand is still in play
  this.score=5;
  this.blackJack = false;
  this.ace=0;
}


Hand.prototype.add = function(card){
  console.log(card);
  this.cards.push(card);
  this.score+=card.point;
  console.log(card.point);
  console.log(this.score);
  if (card.value==='Ace'){ //ace logic for scored hand
    this.ace++;
  }
  
  if(this.score > 21) {
    if (this.ace>0){
      this.score-=10;
      this.ace--;
    }
    this.bust = true;
  } else if(this.score === 21) {
    this.blackJack = true;
  }
};
