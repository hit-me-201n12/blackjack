'use strict';

/////////////////////////////////////////////////////////
//==DECK================DECK=====================DECK==//
/////////////////////////////////////////////////////////

function Card (value, suit, points) {
  // Gameplay-related properties
  this.value = value;
  this.suit = suit;
  this.face = 'down';
  this.src = './img/' + value + '-' + suit + '.png';
  this.points = points;
  this.name = value+' of '+suit;
  // Canvas-related properties
  this.imgObj = new Image();
  this.imgObj.src = this.src;
  this.currentX = 0;
  this.currentY = 0;
  this.destinationX = 0;
  this.destinationY = 0;
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
  animateCard(this);
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
//CANVAS===============CANVAS====================CANVAS//
/////////////////////////////////////////////////////////

// Targeting Canvas element, setting size, and establishing link to 2d drawing methods (context)
var canvas = document.querySelector('canvas');
canvas.setAttribute('height', 600);
canvas.setAttribute('width', 975);
var c = canvas.getContext('2d');

// This function draws the inital table in its default state
var startingTable = function() {
  var img = new Image();
  img.src = 'img/back.png';
  img.onload = function(){
    c.drawImage(img, 0, 0);
  };
};
// startingTable(); Tried moving this call to table.js' gameplay

var setTable = function(update) {
  // Update determines if we're drawing all the cards to updated orders or animating a single card.
  var update = update;

  // Clear the Canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  // Draw default images
  var img = new Image();
  img.src = 'img/back.png';
  img.onload = function() {
    c.drawImage(img, 0, 0);
  }


  // If update is true, draw all players' cards
  if (update) {
    console.log("trying to draw a change in order");
    for(var i in players) {
      for(var j in players[i].hand.cards) {
        console.log("tried to draw a newly updated card");
        players[i].hand.cards[j][0].imgObj.onload = function() {
          c.drawImage(players[i].hand.cards[j][0].imgObj, players[i].hand.cards[j][0].currentX, players[i].hand.cards[j][0].currentY);
        }
      }
    }
  } else { // If update is false
    for(var i in players) {
      // Draw all players' cards, except for player 1
      console.log("trying to draw saved state");
      if (players[i].order !== 1){
        for(var j in players[i].hand.cards) {
          console.log("tried to draw a saved card")
          players[i].hand.cards[j][0].imgObj.onload = function() {
            c.drawImage(players[i].hand.cards[j][0].imgObj, players[i].hand.cards[j][0].currentX, players[i].hand.cards[j][0].currentY);
          };
        }
      }
    }
  }
};

// Pass a Player and a card index into this function to either
// if(update) calculate the new currentX and currentY
// }else{ calculate its destinationX and destinationY
var locate = function(player, cardIndex, update) {
  var player = player;
  var order = player.order;
  var index = cardIndex;
  var update = update; // This determines if we're updating the destination or current coordinates.

  let thisCard = player.hand.cards[index][0];

  if(update){
    if(order < 2) {
      thisCard.currentY = (order + 1) * 240;
      thisCard.currentX = ((index-1) + 1) * 75;
      thisCard.height = 120;
      thisCard.width = 75;
    } else {
      thisCard.currentY = 30 + ((order - 2) * 90);
      thisCard.currentX = 600 - ((index-1) * 37.5);
      thisCard.height = 60;
      thisCard.width = 37.5;
    }
  } else {
    if(order < 2) {
      thisCard.destinationY = (order + 1) * 240;
      thisCard.destinationX = (index + 1) * 75;
      thisCard.height = 120;
      thisCard.width = 75;
    } else {
      thisCard.destinationY = 30 + ((order - 2) * 90);
      thisCard.destinationX = 600 - (index * 37.5);
      thisCard.height = 60;
      thisCard.width = 37.5;
    }
  }
};

var updateTable = function(){
  for(var i = 0 ; i < players.length ; i++){
    for(var j = 0 ; j < players[i].hand.cards.length ; j++){
      locate(players[i], j, true);
    }
  }
  setTable(true);
};

// Pass Players into this function so it can access their entire hand
var animateCard = function(thisPlayer) {
  var thisPlayer = thisPlayer;
  var thisCard = thisPlayer.hand.cards;
  var finalCard = thisCard[thisCard.length -1][0];
  // Call the locating() function to update thisPlayer's last card's destinationX and destinationY
  locate(thisPlayer, thisCard.length - 1, false);

  var animate = function() {
    // Draw table's default state and all other player's cards
    setTable(false);

    // Draw thisPlayer's cards which includes the new card
    console.log("length of thisCard is " + thisPlayer.hand.cards.length);
    for (var i in thisPlayer.hand.cards) {
      thisCard[i][0].imgObj.onload = function(){
        console.log("drawing this player's cards");
        c.drawImage(thisCard[i][0].imgObj, thisCard[i][0].currentX, thisCard[i][0].currentY, thisCard[i][0].width, thisCard[i][0].height);
      };
    }

    // Increment the currentX and currentY properties of thisPlayer's last card
    if(finalCard.currentX < finalCard.destinationX){
      finalCard.currentX += 1;
    }
    if(finalCard.currentY < finalCard.destinationY){
      finalCard.currentY +=1;
    }

    // Repeat by calling the window.requestAnimationFrame(animateCard) until thisPlayer's last card's current and desination coordinates are equal
    if(finalCard.currentX < finalCard.destinationX || finalCard.currentY < finalCard.destinationY) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
};
