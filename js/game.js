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
    // Set Order
    this.order = players.length +1;
    // Add name to div
    var target = document.getElementById('player' + this.order + 'Name');
    target.textContent = this.ID;
  }
};

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
    var destination = document.getElementById('player0');
    destination.appendChild(image);
  } else if (this.order === 1) {
    var destination = document.getElementById('player1Cards');
    destination.appendChild(image);
  } else {
    image.style.height = "60px";
    var location = "player" + this.order + "Cards";
    var destination = document.getElementById(location);
    destination.appendChild(image);
  }

  this.check();

  if (this.hand.bust){
    this.playing = false;
    this.busted = true;
    setOrder();
  }
  if (this.hand.blackJack){
    this.playing=false;
    this.blackJack=true;
    setOrder();
  }
  if (this.hand.score===21){
    this.playing===false;
    setOrder();
  }
};

Player.prototype.stay = function() {
  this.check();
  console.log('stay');
  this.playing = false;
  setOrder();
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

// Clears players' cards from their divs in prep for moving them around the table
var clearPlayerCards = function () {
  for (var i = 0; i < 6; i++){
    var id = "player" + (i + 1) + "Cards";
    var target = document.getElementById(id);
    while (target.firstChild){
      target.removeChild(target.firstChild);
    }
  }
};

// Inserts players' cards and name into their new divs between turns
var movePlayerCards = function() {
  // Clear previous cards
  clearPlayerCards();
  // Insert players' content into new locations
  for(var i = 0; i < players.length -1; i++) {
    // Name
    var nameTarget = document.getElementById('player' + players[i].order + 'Name');
    nameTarget.textContent = players[i].ID;
    // Cards
    var target = document.getElementById("player" + players[i].order + "Cards");
    for(var j = 0; j < players[i].hand.cards.length; j++){
      var image = document.createElement('img');
      image.classList.add("cards");
      image.src = players[i].hand.cards[j][0].src;
      // Scale down cards for players in the sidebar
      if (players[i].order > 1) {
        image.style.height = "60px";
        image.style.width = "37.5px"; 
      }
      target.appendChild(image);
    }
  }
};

// Clears the dealer's cards from its div between games
var clearDealerCards = function() {
  var target = document.getElementById('player0');
  while(target.firstChild){
    target.removeChild(target.firstChild);
  }
};

/////////////////////////////////////////////////////////
//==TABLE===============TABLE===================TABLE==//
/////////////////////////////////////////////////////////

var players = [];
players.push(new Player('connor', false)); 
players.push(new Player('michael', false));
players.push(new Player('skyler', false));

// var players = JSON.parse(localStorage.getItem('players')); // USE THIS WHEN LIVE
console.log(players);

var current = -1;
//create a dealer and push him to position 0 in players
players.push(new Player('Dealer', true));
//Create deck for the game
var deck;

var setOrder = function() {
  for (var i in players){

    if((players[i].order-1 === 0)) {
      players[i].order = players.length -1;
      console.log("first player is now " + players[i].order);
    } else if (players[i].order > 0) {
      console.log("player " + players[i].order);
      players[i].order -= 1;
      console.log("is now player " + players[i].order);
    }
  }
  movePlayerCards();
};

var eventhandler = function(press) { //this is our event handler for hitting and staying.
  if (!players[current].dealer===true){//condition, only use keyboard for hit and stay if not the dealer
    if (players[current].playing){//condition, only hit or stay if the current player is still playing
      let key = press.char || press.charCode || press.which;
      if (key === 32) { //if the user presses space:
        players[current].hit();//player is dealt a card
        // Check to see if player has busted or blackJack to set 'playing' to false
        if(players[current].blackJack){
          players[current].playing = false;
          nextPlayer();
        } else if(players[current].busted) {//if the player busts, they are also no longer playing
          players[current].playing = false;
          nextPlayer();
        }
      } else if (key === 13) {// if user presses enter
      // function call back playerStand()
        players[current].stay();
        nextPlayer();
      }
    }
  }

};

var gamePlay = function() {
  //Write something to clear/reset all players objects (hand, and booleans)
  console.log('newRound');
  newRound();
  // deal the cards
  console.log('dealCards');
  dealcards();
  console.log('done dealing cards');

  // taking turns checking scores
  nextPlayer();
};

var newRound = function (){
  deck = new Deck();
  deck.build();
  deck.shuffle();
  for (var i in players){
    players[i].newGame;
  }
};

var dealcards = function(){
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
  }
  for(var i in players) {
    players[i].hit();
    console.log(players[i]);
  }
};

var nextPlayer = function(){
  current++;

  console.log(players[current].ID+'s turn, current score: '+players[current].hand.score+' order '+players[current].order);
  //console.log(players[current]+'s turn, score: '+players[current].hand.score);

  if(players[current].dealer){//if the current player is the dealer
    window.removeEventListener('keypress', window);
    var dPlay=true;
    while(dPlay===true){
      if(players[current].hand.score<17){
        players[current].hit();
      }else if (players[current].hand.score === 17 && players[current].hand.aces>0){
        players[current].hit;
      }else if(players[current].hand.score===17){
        console.log('dealerStay');
        players[current].stay;
        dPlay=false;
        break;
      }else{
        console.log('dealerStay');
        players[current].stay;
        dPlay=false;
        break;
      }
    }
    current--;
    checkScores();
  }else if (current<players.length-1){
    window.addEventListener('keypress', eventhandler);
    if(!players[current].playing && players[current].hand.blackJack){
      console.log(players[current].ID+' scored blackjack off of the draw!');
      setOrder();
      nextPlayer();
    }
  }
};

var dealerTurn = function(){
  window.removeEventListener('keypress', window);
  var dPlay=true;
  while(dPlay===true){
    if(players[current].hand.score<17){ //hits below 17
      players[current].hit();
      if(players[current].busted||players[current].hand.score===21){
        dPlay=false;
        players[current].playing=false;
        checkScores();
      }
    }else if (players[current].hand.score === 17 && players[current].hand.aces>0){ //hits a soft 17
      players[current].hit;
      if(players[current].busted||players[current].hand.score===21){
        dPlay=false;
        players[current].playing=false;
        checkScores();
        return;
      }
    }else if(players[current].hand.score===17){
      console.log('dealerStay');
      players[current].stay;
      players[current].playing=false;
      checkScores();
      dPlay=false;
      return;
    }else{
      console.log('dealerStay');
      players[current].stay;
      players[current].playing=false;
      checkScores();
      dPlay=false;
      return;
    }
  }
};

var checkScores = function(){
  current--;
  if (current>-1){
    if (!players[players.length-1].playing){
      var dealerbust= (players[players.length-1].busted);
      var dealerScore = players[players.length-1].hand.score;
      if (!players[current].busted){
        if (players[current].hand.score>dealerScore||dealerbust){
          players[current].wins++;
          console.log(players[current].ID+' won their hand.');
        }else if (players[current].hand.score===dealerScore){
          players[current].wins+=0;
          console.log(players[current].ID+' washed.');
        }else{
          players[current].wins--;
          console.log(players[current].ID+' lost their hand');
        }
      }else{
        players[current].wins--;
      }
    }else{
      console.log(players[current].ID+' lost their hand.');
    }
    if (current>-1){
      checkScores();
    }
  }
};

var testGame = function() {
  console.log(players);
  gamePlay();
};

// pop up function
var popUpEl = document.getElementById('popUpRules');
console.log(popUpEl);
popUpEl.addEventListener('click', (e) => {
  var popup = document.getElementById('popUp')
  popup.classList.toggle('appear')
})
// call classList.toggle DOM method on popup element. This DOM method creates a class with the name of the string value passed as an argument. In the CSS, a selector named #popUpRules .appear exists already. By creating the class 'appear', it activates the CSS block that styles the .appear class. One of the properties is visibility: visible. This event handler takes the element in its existing state of visibility: hidden to the new state of visibility: visible. With a z-index, it appears on top of other elements.

// function calls
testGame();