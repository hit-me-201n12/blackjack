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
  this.dealer = dealer; //boolean, true for one dealer character in the game.
  this.wins = 0;

}

Player.prototype.hit = function () {
  console.log(this.ID+' hit');
  this.hand.add(deck.deal());
  this.check();
  if (this.hand.bust){
    this.playing = false;
    this.busted = true;
  }
  if (this.hand.blackJack){
    this.playing=false;
    this.blackJack=true;
  }
  if (this.hand.score===21){
    this.playing===false;
  }
};

Player.prototype.stay = function() {
  this.check();
  console.log('stay');
  this.playing = false;
};

Player.prototype.newGame = function(){
  this.hand=new Hand;
};

// Player.prototype.dealerTurn = function(){
//   if(this.hand.score<17){
//     this.hit();
//   }else if (this.hand.score === 17 && this.hand.aces>0){
//     this.hit;
//   }else if(this.hand.score===17){
//     this.stay;
//   }
//   else{
//     this.stay;
//   }
// };

Player.prototype.check = function(){
  var x='';
  for (var i = 0 ; i<this.hand.cards.length; i++){
    x+=this.hand.cards[i][0].name;
  }
  console.log(this.ID+': '+x+'   Score: '+this.hand.score);
};

function Hand() {
  this.cards = []; //an array of all cards in the current hand
  this.bust = false; //a boolean that determines whether the current hand is still in play
  this.score = 0;
  this.blackJack = false;
  this.ace = 0;
}


Hand.prototype.add = function(card){
  this.cards.push(card);
  if (card[0].value==='Ace'){ //ace logic for scored hand
    this.ace++;
  }
  this.score+=card[0].points;
  if(this.score > 21) {
    if (this.ace>0){
      this.score-=10;
      this.ace--;
    }else{
      this.bust = true;
      console.log('BUST!');
    }
  } else if(this.score === 21 && this.cards.length===2) {
    this.blackJack = true;
    console.log('BLACKJACK!');
  }
};

