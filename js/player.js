'use strict';

// Purpose:
// Take Actions
//  Hit or Stay



function Player(ID, dealer) {//the player object is an object that when created is passed a string for the player name
  this.ID = ID; //string for player name
  this.hand = new Hand(); //creates a hand object for the player to use
  this.playing = true; //boolean, false until the players turn has started, returns to false when the player ends their turn
  this.busted = false; //boolean, determinate of whether that player has busted or not
  this.blackJack = false; //boolean, returns true when 21 is first dealt, or if this.player's score beats the dealer's.score
  this.dealer = dealer;
}

Player.prototype.hit = function () {
  this.hand.add(deck.deal());
  if (this.hand.bust){
    this.playing = false;
    this.busted = true;
  }
  if (this.hand.blackJack){
    this.playing=false;
    this.blackJack=true;
  }
};

Player.prototype.stay = function() {
  this.playing = false;
};

function Hand() {
  this.cards = []; //an array of all cards in the current hand
  this.bust = false; //a boolean that determines whether the current hand is still in play
  this.points = 0;
  this.blackJack = false;
  this.ace = 0;
}


Hand.prototype.add = function(card){
  this.cards.push(card);
  if (card[0].value==='Ace'){ //ace logic for scored hand
    this.ace++;
  }
  this.points+=card[0].points;
  console.log(this.points);
  if(this.points > 21) {
    if (this.ace>0){
      this.points-=10;
      this.ace--;
    }
    this.bust = true;
    console.log('BUST!');
  } else if(this.points === 21) {
    this.blackJack = true;
    console.log('BLACKJACK!');
  }
};
