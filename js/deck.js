'use strict';

// Purpose:
// Create Cards
// Create Deck
// Deal Cards

function Card (value, suit) { //-- card object - also has a reference to source file
    this.value = value;
    this.suit = suit;
    this.face = 'down';
    this.src = './img/' + value + '-' + suit + '.png';
    this.point = points;
 
}


//Card objects


function Deck () { //-- make a deck of 52 cards
  this.inPlay = [];
  this.disCard = [];
};

Deck.prototype.shuffle = function () {//-- shuffles deck
  var placeholder = [];
  while (this.inPlay.length) {
    var pick = Math.floor(Math.random()*(this.inPlay.length));
    placeholder.push(this.inPlay.splice(pick,1));
    console.log(pick);
  }
  console.log(placeholder);
  this.inPlay = placeholder;
};

Deck.prototype.deal = function () { //-- deals cards  ############## connor changed to "deal" because the deck deals what the player is dealt
  return this.inPlay.pop();
};

Deck.prototype.build = function() {//-- uses card constructor to build new deck
  var suit = ['diamonds', 'clubs', 'hearts', 'spades'];
  var value = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];

  for (var i = 0; i<suit.length; i++){
    for (var j = 0; j<value.length; j++){
      var card = new Card(value[j],suit[i]);
      this.inPlay.push(card);
    }
  }
};

// function calls

var testDeck = new Deck();
testDeck.build();
