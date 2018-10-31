'use strict';
let log = console.log();

// Purpose:
// Starting Game
//  Create Players
//    (take and store player names)
//    (dealer-player creation)
//   Calls Deck creation
//   Prompting Deck to deal cards to Players to start game
//      (ie. Dealer and 1 player to start)
// Handle Turn Order
//    Iterates over players

// Global Vars
//var players = JSON.parse(localStorage.getItem('players'));    USE THIS WHEN LIVE

var players = [new Player('connor', false), new Player('michael', false), new Player('skyler', false)];
var current = -1;
//create a dealer and push him to position 0 in players
players.push(new Player('Dealer', true));
//Create deck for the game
var deck;

var setOrder = function(){
  for (var i=0 ; i<players.length-1 ; i++){
    players[i].order=i+1;
  }
  players[players.length-1].order=0;
};

var eventhandler = function(press) { //this is our event handler for hitting and staying.
  
  console.log(current);
  if (current===-1){
    return;
  }
  //condition, only use keyboard for hit and stay if not the dealer
  if (players[current].playing){//condition, only hit or stay if the current player is still playing
    if (!players[current].dealer===true){
      let key = press.char || press.charCode || press.which;
      if (key === 32) { //if the user presses space:
        press.preventDefault();
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
        press.preventDefault();
        players[current].stay();
        nextPlayer();
      }
    }
  }
};





// gameplay
var gamePlay = function() {
  //Write something to clear/reset all players objects (hand, and booleans)
  newRound();
  console.log('newRound');
  // deal the cards
  dealcards();
  console.log('dealCards');
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
  setOrder();
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
  playerOrder(1);

  console.log();
  console.log(players[current].ID+'s turn, current score: '+players[current].hand.score+' order '+players[current].order);
  //console.log(players[current]+'s turn, score: '+players[current].hand.score);



  if(players[current].dealer){//if the current player is the dealer
    dealerTurn();
  }else if (current<players.length-1){
    window.addEventListener('keypress', eventhandler);
    if(!players[current].playing && players[current].hand.blackJack){
      console.log(players[current].ID+' scored blackjack off of the draw!');
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
  playerOrder(-1);
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
        console.log(players[current].ID+' lost their hand.');
      }
      if (current>-1){
        checkScores();
      }
    }
  }
};

var playerOrder = function(direction){
  if (direction===1){
    for(var i = 0; i<players.length-1; i++) {
      if (players[i].order===1){
        players[i].order===players.length;
      }else{
        players[i].order--;
      }
    }
  }
  if (direction===-1){
    for(var i=0; i<players.length-1; i++) {
      if (players[i].order===players.length){
        players[i].order===1;
      }else{
        players[i].order++;
      }
    }
  }
  updateTable();
};

var testGame = function() {
  console.log(players);
  gamePlay();

};

// function calls
testGame();
