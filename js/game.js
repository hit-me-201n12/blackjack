'use strict';

/////////////////////////////////////////////////////////
//==SOUND FX===========SOUND FX================SOUND FX//
/////////////////////////////////////////////////////////

var soundToPlay = 0;
function playHitSound () {
  var sounds = hitSounds[soundToPlay % hitSounds.length];
  sounds.currentTime = 0;
  sounds.play();
  soundToPlay += 1;
}

var hitSound = new Audio();
hitSound.src = 'audio/knock1.mp3';
hitSound.oncanplaythrough = function () {
  hitSound.readyToPlay = true;
};
var hitSound2 = new Audio();
hitSound2.src = 'audio/knock2.mp3';
hitSound2.oncanplaythrough = function () {
  hitSound2.readyToPlay = true;
};
var hitSound3 = new Audio();
hitSound3.src = 'audio/knock3.mp3';
hitSound3.oncanplaythrough = function () {
  hitSound3.readyToPlay = true;
};
var hitSound4 = new Audio();
hitSound4.src = 'audio/knock4.mp3';
hitSound4.oncanplaythrough = function () {
  hitSound4.readyToPlay = true;
};

var hitSounds = [hitSound, hitSound2, hitSound3, hitSound4];

function playStandSound () {
  if (standSound && standSound.readyToPlay) {
    standSound.currentTime = 0;
    standSound.play();
  }
}

var standSound = new Audio();
standSound.src = 'audio/stay2.mp3';

standSound.oncanplaythrough = function () {
  standSound.readyToPlay = true;
};

function playIntroSound () {
  if (introSound && introSound.readyToPlay) {
    introSound.currentTime = 0;
    introSound.play();
  }
}

var introSound = new Audio();
introSound.src = 'audio/intro.mp3';
introSound.oncanplaythrough = function () {
  introSound.readyToPlay = true;
};

/////////////////////////////////////////////////////////
//==DECK================DECK=====================DECK==//
/////////////////////////////////////////////////////////

function Card (value, suit, points) {
  this.value = value;
  this.suit = suit;
  this.src = './img/' + value + '-' + suit + '.png';
  this.points = points;
  this.name = value+' of '+suit;
}

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
}

Player.prototype.hit = function () {
  this.hand.add(deck.deal());
  if (this.hand.cards.length>2 && !this.dealer){
    newStatus(this.ID+' hit');
    newStatus(this.hand.score);
  }
  var image = document.createElement('img');
  // Dealer card flip or normal image
  if(this.dealer && this.hand.cards.length === 1){
    image.src = './img/back.png';
  } else {
    image.src = this.hand.cards[this.hand.cards.length -1][0].src;
  }
  image.classList.add('cards');
  // New HTML Rendering
  if(this.dealer) {
    // Draw cards in dealer's area
    var destination = document.getElementById('player0');
    destination.appendChild(image);
  } else if (this.order === 1 && this.hand.cards.length <= 6) {
    // Draw cards in Player 1 area at full-size
    var destination = document.getElementById('player1Cards');
    destination.appendChild(image);
  } else if (this.order === 1 && this.hand.cards.length > 6) {
    // Draw cards in Player 1 area at half-size
    var destination = document.getElementById('player1Cards');
    // Clear all player 1's cards
    while(destination.firstChild){
      destination.removeChild(destination.firstChild);
    }
    // Redraw previous cards
    for (var i = 0; i < this.hand.cards.length - 1; i++){
      var replaceCard = document.createElement('img');
      replaceCard.src = this.hand.cards[i][0].src;
      replaceCard.style.height = '60px';
      destination.appendChild(replaceCard);
    }
    // Add the new card
    image.style.height = '60px';
    destination.appendChild(image);
  } else {
    // Draw cards in other Player's areas at half-size
    image.style.height = '60px';
    var location = 'player' + this.order + 'Cards';
    var destination = document.getElementById(location);
    destination.appendChild(image);
  }

  // Check if player was dealt a blackjack
  if (this.hand.blackJack && !this.dealer){
    newStatus(this.ID+' drew 21!');
    this.playing = false;
    this.blackJack = true;
  }

  // Only check hand if player has hit, not been dealt to
  if(this.hand.cards.length > 2){
    this.checkHand();
  }
};

Player.prototype.checkHand = function() {
  if (this.hand.bust){
    newStatus(this.ID+' busted.');
    this.playing = false;
    this.busted = true;
    setOrder();
  }
  if (this.hand.blackJack && !this.dealer){
    newStatus(this.ID+' drew 21!');
    this.playing=false;
    this.blackJack=true;
    // setOrder();
  } else if (this.hand.score===21 && !this.dealer){
    newStatus(this.ID+' scored 21!');
    this.playing = false;
    setOrder();
    nextPlayer();
  }
};

Player.prototype.stay = function() {
  if (!this.dealer){
    newStatus(this.ID+' stayed at '+this.hand.score);
  }
  this.playing = false;
  setOrder();
};

Player.prototype.newGame = function(){
  this.hand=new Hand;
  this.playing = true;
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
  while(this.score > 21 && this.ace>0) {
      this.ace--;
      this.score-=10;
  }
  if (this.score>21){
    this.bust = true;
  } else if(this.score === 21 && this.cards.length===2) {
    this.blackJack = true;
  }
};

/////////////////////////////////////////////////////////
//==RENDER=============RENDER==================RENDER==//
/////////////////////////////////////////////////////////

var log = document.getElementById('log');
var ulEl = document.createElement('ul');
var gameCounter = 0;

var clearPlayerCards = function () {
  for (var i = 0; i < 6; i++){
    var id = 'player' + (i + 1) + 'Cards';
    var target = document.getElementById(id);
    while (target.firstChild){
      target.removeChild(target.firstChild);
    }
  }
};

var movePlayerCards = function() {
  // Clear previous cards
  clearPlayerCards();
  // Insert players' content into new locations
  for(var i = 0; i < players.length -1; i++) {
    // Name
    var nameTarget = document.getElementById('player' + players[i].order + 'Name');
    nameTarget.textContent = players[i].ID;
    // Cards
    var target = document.getElementById('player' + players[i].order + 'Cards');
    for(var j = 0; j < players[i].hand.cards.length; j++){
      var image = document.createElement('img');
      image.classList.add('cards');
      image.src = players[i].hand.cards[j][0].src;
      // Scale down cards for players in the sidebar
      if (players[i].order > 1) {
        image.style.height = '60px';
        image.style.width = '37.5px';
      }
      target.appendChild(image);
    }
  }
};

var clearDealerCards = function() {
  var target = document.getElementById('player0');
  while(target.firstChild){
    target.removeChild(target.firstChild);
  }
};

var newStatus = function(string){
  var ulEll = document.getElementById('game' + gameCounter);
  var liEl = document.createElement('li');
  liEl.textContent=string;
  ulEll.appendChild(liEl);
  updateScroll();
};

function updateScroll(){
  var element = document.getElementById('log');
  element.scrollTop = element.scrollHeight;
}

/////////////////////////////////////////////////////////
//==TABLE===============TABLE===================TABLE==//
/////////////////////////////////////////////////////////

var players = [];
// players.push(new Player('connor', false));
// players.push(new Player('michael', false));
// players.push(new Player('skyler', false));

// USE THIS WHEN LIVE
var playersNames = JSON.parse(localStorage.getItem('players'));
var current = -1;

//Create deck for the game
var deck;

var setOrder = function() {
  // Initial change of order
  for (var i in players){
    if((players[i].order-1 === 0)) {
      players[i].order = players.length -1;
    } else if (players[i].order > 0) {
      players[i].order -= 1;
    }
  }

  // Check if new player 1 has a blackjack, if so move again
  for (var j in players) {
    if(players[j].hand.blackJack && players[j].order === 1){
      setOrder();
    }
  }
  movePlayerCards();
};

var resetOrder = function() {
  for (var i = 0; i < players.length -1; i++){
    players[i].order = i + 1;
  }
  movePlayerCards();
};

var eventhandler = function(press) { //this is our event handler for hitting and staying.
  if (current>-1){
    if (!players[current].dealer){//condition, only use keyboard for hit and stay if not the dealer
      if (players[current].playing){//condition, only hit or stay if the current player is still playing
        let key = press.char || press.charCode || press.which;
        if (key === 32) { //if the user presses space:
          playHitSound();
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
          playStandSound();
          players[current].stay();
          nextPlayer();
        }
      }
    }
  }
};

var gamePlay = function() {
  //Write something to clear/reset all players objects (hand, and booleans)
  newRound();
  // deal the cards
  dealcards();
  // taking turns checking scores
  nextPlayer();
};

var newRound = function (){
  for (var y=0 ; y<playersNames.length ; y++){
    players.push(new Player(playersNames[y], false));
  }
  //create a dealer and push him to position 0 in players
  players.push(new Player('Dealer', true));
  console.log(players);
  deck = new Deck();
  deck.build();
  deck.shuffle();
  var ulEl=document.createElement('ul');
  ulEl.setAttribute('id', 'game' + gameCounter);
  log.appendChild(ulEl);

  for (var i in players){
    players[i].newGame();
  }
};

var dealcards = function(){
  for(var j = players.length-1; j > -1; j--){
    players[j].hit();
  }
  for(var i in players) {
    players[i].hit();
  }
};

var nextPlayer = function(){
  current++;

  newStatus(players[current].ID+'s turn, current score: '+players[current].hand.score);
  if(players[current].dealer){//if the current player is the dealer
    // Flip the dealer's first card
    var target = document.getElementById('player0');
    target.firstChild.src = players[current].hand.cards[0][0].src;
    dealerTurn();
  }else if (current<players.length-1){
    window.addEventListener('keypress', eventhandler);
    if(!players[current].playing && players[current].hand.blackJack){
      newStatus(players[current].ID+' scored blackjack off of the draw!');
      setOrder();
      movePlayerCards();
      nextPlayer();
    }
  }
};

var dealerTurn = function(){
  window.removeEventListener('keypress', window);
  var dPlay=true;
  while(dPlay===true){
    if(players[current].hand.score<17){
      newStatus('The dealer hit at '+players[current].hand.score);
      players[current].hit();
    }else if (players[current].hand.score === 17 && players[current].hand.aces>0){
      newStatus('The dealer hit with a soft 17');
      players[current].hit;
    }//else if(players[current].hand.score===17){
    //   newStatus('The dealer stayed at '+players[current].hand.score);
    //   players[current].stay;
    //   dPlay=false;
    //   players[current].playing = false;
    //   checkScores();
    //   break;
    else{
      if (!players[current].hand.bust){
        newStatus('The dealer stayed at '+players[current].hand.score);
        dPlay = false;
        players[current].playing = false;
        checkScores();
        break;
      } else {
        players[current].stay;
        dPlay=false;
        players[current].playing = false;
        checkScores();
        break;
      }
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
        if (players[current].hand.score==dealerScore){ //Player ties with dealer = wash
          players[current].wins+=0;
          newStatus(players[current].ID+' washed.');
        }else if (players[current].hand.score>dealerScore||dealerbust){ //Player beats dealer, or dealer busts = win
          players[current].wins++;
          newStatus(players[current].ID+' won their hand.');
        }else{
          players[current].wins--;
          newStatus(players[current].ID+' lost their hand');
        }
      }else{
        players[current].wins--;
        newStatus(players[current].ID+' lost their hand.');
      }
    }
    if (current>-1){
      checkScores();
    }
    localStorage.setItem('players', JSON.stringify(players));
  }
  // Display the buttons
  var button1 = document.getElementById('continue');
  var button2 = document.getElementById('quit');
  button1.style.display = 'block';
  button2.style.display = 'block';
};

var nextGame = function(event) {
  var event = event;
  var button1 = document.getElementById('continue');
  var button2 = document.getElementById('quit');
  button1.style.display = 'none';
  button2.style.display = 'none';
  var option = event.target.id;
  if (option === 'quit'){
    window.location.href = 'home.html';
    
  } else if (option === 'continue') {
    console.log('resetting game');
    localStorage.setItem('players', JSON.stringify(playersNames));
    window.open('game.html', '_self');
  }
};

var gameControls = document.getElementById('gameControls');
gameControls.addEventListener('click', nextGame);

// pop up function
var popUpEl = document.getElementById('popUpRules');
popUpEl.addEventListener('click', (e) => {
  var popup = document.getElementById('popUp');
  popup.classList.toggle('appear');
});
// function calls
gamePlay();

