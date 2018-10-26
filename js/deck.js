'use strict'

function Card (value, suit) {
    this.value = value;
    this.suit = suit;
    this.face = down;
  //point value as another property?
};


//Card objects


function Deck () {
    inPlay = [];
    disCard = [];
};

//Deck.prototype.shuffle() -- shuffles deck
//Deck.prototype.deal() -- deals cards

Deck.prototype.build = function() {//-- uses card constructor to build new deck
  var suits = ['diamond', 'clubs', 'hearts', 'spades'];
  var values = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];

  for (var i = 0; i<suits.length; i++){
    for (var j = 0; j<values.length; j++){
      this.inPlay.push(card(j,i));
    }
  }
}