'use strict';

// Purpose:
// Logic for home.html
// need to append a form to the page if 'Start Game' button is pressed

// takes player's input (potentially cover for if user tries to enter 'dealer' as their name)
// instansitate in an array in home.js, stringifies
// save, put in local-storage
// local-storage, destringify
var gameForm = document.getElementById('newGameForm');
gameForm.addEventListener('submit', newPlayer);
var newPlayer = new Player;
