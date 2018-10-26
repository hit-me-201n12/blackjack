'use strict'

function Player(ID) {//the player object is an object that when created is passed a string for the player name 
    
    this.ID = ID; //string for player name 
    this.hand = new Hand(); //creates a hand object for the player to use 
    this.playing = false; //boolean, false until the players turn has started, returns to false when the player ends their turn
    this.busted = false; //boolean, determinate of whether that player has busted or not
    this.win = false; //boolean, returns true when 21 is scored
    
}

Player.prototype.dealt = function (card) {
    this.hand.add(card); 
}

Player.prototype.turn = function (turn){//this method of player is given a choice 
    var action

    action = prompt('what would you like to do?(h/s)');
        if (action===h){
            this.dealt(deck.deal);
        }

}

function Hand(cards, value, bust) {
    this.cards = []; //an array of all cards in the current hand
    this.bust = false; //a boolean that determines whether the current hand is still in play
}
    

Hand.prototype.add = function(card){
    this.cards.push(card);
    this.value+=card.points;
    this.

}
Hand.prototype.value = function(){
    var score = 0
    
    for (var i=0 ; i<this.cards.length; i++){
        if (cards[i]==='Ace'){//ace logic to determine 1 or 11
            cards.push(cards.splice(i,1)); 
        }
        score+=cards[i].points;

    }
}
// game starts, prototype.dealt() deals one card at a time to player
