'use strict';

// Purpose:
// Logic for home.html
// need to append a form to the page if 'Start Game' button is pressed

// Global Vars
var players = [];
var numPlayers = 0;
var gameForm = document.getElementById('newGameForm');
var newEmForm = document.getElementById('emForm');
var numEvent;
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

var handleNewGame = function(startEvent) {
  startEvent.preventDefault();
  startEvent.stopPropagation();
  numPlayers = startEvent.target.numPlayers.value;
  console.log(numPlayers);

  for (var i = 0; i < numPlayers; i++) {
    // use DOM manipulation to print out numPlayer number of fields to input names (separate form for player names?)
    //make new input tags for however many i
    var nameEl = document.createElement('input');
    newEmForm.appendChild(nameEl);
    nameEl.setAttribute('name','player'+(i+1));
    nameEl.setAttribute('type','text');
  }
  
  gameForm.remove();

  var buttonEl = document.createElement('button');
  var bText = document.createTextNode('Buy In!');
  buttonEl.setAttribute('class','button');
  buttonEl.setAttribute('type','submit');
  newEmForm.appendChild(buttonEl);
  buttonEl.appendChild(bText);

};

var handleNumPlayers = function(numEvent) {
	// second sub-form to handle name fields

  numEvent.preventDefault();
  numEvent.stopPropagation();

  for (var i=0; i<numPlayers; i++){ // iterate through the names, take field values, and push into players array 
    var nameGets = numEvent.target['player',i].value;
    players.push(nameGets);
  }
  console.log(players);
	save();
  window.open('game.html', '_self');
};

var save = function() {
  localStorage.setItem('players', JSON.stringify(players));
};

var gameLoad = JSON.parse(localStorage.getItem('players'));

// Event Listeners
gameForm.addEventListener('submit', handleNewGame);
newEmForm.addEventListener('submit', handleNumPlayers);
