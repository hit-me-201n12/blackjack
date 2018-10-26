'use strict'

function Card (value, suit) {
    this.value = value;
    this.suit = suit;
    this.face = 'down';
  //point value as another property?
};


//Card objects


function Deck () {
    this.inPlay = [];
    this.disCard = [];
};

Deck.prototype.shuffle = function () {//-- shuffles deck
  var placeholder = [];
  while (this.inPlay.length) {
    var pick = Math.floor(Math.random(this.inPlay.length+1));
    this.placeholder.push(this.inPlay.splice(pick,1));
  }
  console.log(placeholder);
  this.inPlay = placeholder;
}

//Deck.prototype.deal() -- deals cards

Deck.prototype.build = function() {//-- uses card constructor to build new deck
  var suit = ['diamond', 'clubs', 'hearts', 'spades'];
  var value = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace'];

  for (var i = 0; i<suit.length; i++){
    for (var j = 0; j<value.length; j++){
      var card = new Card(value[j],suit[i]);
      this.inPlay.push(card);
      // console.log(j);
    }
    // console.log(i);
  }
}