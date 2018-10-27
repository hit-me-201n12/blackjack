'use strict';
//notes for table
//-player.dealt is passed 1 card in its argument
//-player.turn makes one action and modifies the player object
//-----
//player name stored in player.ID
//player.hand should never be accessed outside of the player.js file
//the player could hold as many as 14 cards, potetnially, so we need to accomodate that in our html
//

let log = console.log;




function Player(ID) {//the player object is an object that when created is passed a string for the player name

  this.ID = ID; //string for player name
  this.hand = new Hand(); //creates a hand object for the player to use
  this.playing = false; //boolean, false until the players turn has started, returns to false when the player ends their turn
  this.busted = false; //boolean, determinate of whether that player has busted or not
  this.win = false; //boolean, returns true when 21 is scored
  this.dealer=false;//boolean to determine to act as dealer
}

Player.prototype.dealt = function (card) {
  this.hand.add(card);
  if (this.hand.bust){
    this.busted=true;
  }
  if (this.hand.score===21){
    this.win=true;
    this.playing=false;
  }
};

Player.prototype.turn = function(){//this method of player is given a choice

  if (this.dealer){
    if(this.hand.score<16){//hits under 16
      this.dealt(deck.deal());
    }else if (this.hand.score===17 && this.hand.aces>0){ //hits on soft 17

    }else{ //stay

    }


    if (this.playing){
      var action=false;
      window.addEventListener('keypress', (e) => {
        while (!action){
          let char = e.char || e.charCode || e.which;
          if (char === 32) {
            this.dealt(deck.deal());
            action=true;
          } else if (char === 13) {
            this.playing=false;
            action=true;
          }
        }
      });
    }
  }
};


function Hand() {
  this.score=0;
  this.cards = []; //an array of all cards in the current hand
  this.bust = false; //a boolean that determines whether the current hand is still in play
  this.aces = 0;
}


Hand.prototype.add = function(card){ //this method is always only accessed by the player holding the hand. do not call in table
  if (card.value === 'Ace'){
    this.aces++;
    if (this.score<11)
      card.points=11;
  }
  this.cards.push(card);
  this.score+=card.points;

};

// game starts, prototype.dealt() deals one card at a time to player

var testPlayer= new Player('Connor');

log(testPlayer);

testPlayer.dealt(testDeck.deal());

log(testPlayer);

testPlayer.playing=true;
testPlayer.turn();

log(testPlayer);

log(testPlayer);

log(testPlayer);




//things I need
//'points' feild for card.js
//


//to do:
// dynamically determine the value of an Ace
// write better dealer logic
// write reset function



//table.js
