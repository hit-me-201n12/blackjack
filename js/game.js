'use strict';

/////////////////////////////////////////////////////////
//==DECK================DECK=====================DECK==//
/////////////////////////////////////////////////////////

function Card (value, suit, points) {
  this.value = value;
  this.suit = suit;
  this.face = 'down';
  this.src = './img/' + value + '-' + suit + '.png';
  this.points = points;
  this.name = value+' of '+suit;
}

Card.prototype.points = function(){
  return(this.points);
};

function Deck () {
  this.inPlay = [];
}

Deck.prototype.shuffle = function () {
  var placeholder = [];
  while (this.inPlay.length) {
    var pick = Math.floor(Math.random()*(this.inPlay.length));
    placeholder.push(this.inPlay.splice(pick,1));
  }
  this.inPlay = placeholder;
};

Deck.prototype.deal = function () {
  return this.inPlay.pop();
};

Deck.prototype.build = function() {
  var suit = ['diamonds', 'clubs', 'hearts', 'spades'];
  var value = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
  var points = [2,3,4,5,6,7,8,9,10,10,10,10,11];

  for (var i = 0; i<suit.length; i++){
    for (var j = 0; j<value.length; j++){
      var card = new Card(value[j],suit[i],points[j]);
      this.inPlay.push(card);
    }
  }
};

/////////////////////////////////////////////////////////
//==PLAYER=============PLAYER==================PLAYER==//
/////////////////////////////////////////////////////////

function Player(ID, dealer) {
  this.ID = ID; //string for player name
  this.hand = new Hand(); //creates a hand object for the player to use
  this.playing = true; //boolean, false until the players turn has started, returns to false when the player ends their turn
  this.busted = false; //boolean, determinate of whether that player has busted or not
  this.blackJack = false; //boolean, returns true when 21 is first dealt, or if this.player's score beats the dealer's.score
  this.dealer = dealer; //boolean, true for one dealer character in the game.
  this.wins = 0;
  if(dealer){
    this.order = 0;
  } else {
    this.order = players.length +1;
  }
}

Player.prototype.hit = function () {
  console.log(this.ID+' hit');
  this.hand.add(deck.deal());
  // call something to append new card here.
  var image = document.createElement('img');
  image.src = this.hand.cards[this.hand.cards.length -1][0].src;
  image.classList.add("cards");

  // New HTML Rendering
  console.log("this player's order is " + this.order);
  if(this.ID === 'Dealer') {
    var destination = document.getElementById('dealer');
    destination.appendChild(image);
  } else if (this.order === 1) {
    var destination = document.getElementById('playing');
    destination.appendChild(image);
  } else {
    image.style.height = "60px";
    var location = "player" + this.order;
    var destination = document.getElementById(location);
    destination.appendChild(image);
  }

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
  if (card[0].value==='ace'){ //ace logic for scored hand
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

/////////////////////////////////////////////////////////
//==RENDER=============RENDER==================RENDER==//
/////////////////////////////////////////////////////////

