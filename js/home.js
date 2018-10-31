'use strict';

// Purpose:
// Logic for home.html
// need to append a form to the page if 'Start Game' button is pressed

// Global Vars
var players = [];
// previous players - calls local storage, tries to see if another player has previous data

/*
How many players? (dropdown with how many players)
*create # of fields based on this answer*
pull player names, plug into array
start a new game

increment submits
*/

// takes player's input (potentially cover for if user tries to enter 'dealer' as their name) or leave it in as a "feature?"
// instansitate in an array in home.js, stringifies
// save, put in local-storage
// local-storage, destringify
var gameForm = document.getElementById('newGameForm');
var newEmForm = document.getElementById('emForm');

var handleNewGame = function(startEvent) {
  startEvent.preventDefault();
  startEvent.stopPropagation();
  var numPlayers = startEvent.target.numPlayers.value;
  console.log(numPlayers);

  for (var i = 0; i < numPlayers; i++) {
    // use DOM manipulation to print out numPlayer number of fields to input names (separate form for player names?)
    //make new input tags for however many i
    var nameEl = document.createElement('input');
    newEmForm.appendChild(nameEl);
    nameEl.setAttribute('name','player'+(i+1));
    nameEl.setAttribute('type','text');
    // console.log(startEvent.target['player1'].value);
    // var playerName = startEvent.target['player'+(i+1)].value;
    // players.push(new Player(playerName));
  }
  var buttonEl = document.createElement('button');
  buttonEl.setAttribute('type','submit');
  newEmForm.appendChild(buttonEl);
  // console.log(players);
  // save();
};

var handleNumPlayers = function(numEvent) {
  numEvent.preventDefault();
  numEvent.stopPropagation();

//   window.open('game.html', '_self');
};
/* EOD 10/29
-figure out how to pull player at i
	-pull it by element name?
*/


var save = function() {
  localStorage.setItem('players', JSON.stringify(players));
};

var gameLoad = JSON.parse(localStorage.getItem('players'));

gameForm.addEventListener('submit', handleNewGame);
newEmForm.addEventListener('submit', handleNumPlayers);
