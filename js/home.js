'use strict';

// Purpose:
// Logic for home.html
// need to append a form to the page if 'Start Game' button is pressed

// Global Vars
var players = [];

// takes player's input (potentially cover for if user tries to enter 'dealer' as their name)
// instansitate in an array in home.js, stringifies
// save, put in local-storage
// local-storage, destringify
var gameForm = document.getElementById('newGameForm');
var handleNewGame = function(startEvent) {
	startEvent.preventDefault();
  startEvent.stopPropagation();
	var playerName = startEvent.target['ID'].value;
	players.push(new Player(playerName));
	console.log(players);
	save();
	window.open('game.html', '_self');
};

var save = function() {
	localStorage.setItem('players', JSON.stringify(players));
};

var gameLoad = JSON.parse(localStorage.getItem('players'));

gameForm.addEventListener('submit', handleNewGame);
