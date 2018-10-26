'use strict'
var wdym = document.addEventListener
function Player(ID) {
    
    this.ID = ID;
    this.hand = new Hand();
    this.playing=false;
    this.busted=false;
    this.win=false;
    
}

Player.prototype.dealt = function (card) {
    this.hand.add(card); 
}

Player.prototype.turn = function (){
    var action
    while(action!=='h'||action!=='s'){

    action = prompt('what would you like to do?(h/s)');
        if (action===h){
            this.dealt(deck.deal);
        }

}

function Hand(cards, value, bust) {
    this.cards = [];
    this.bust = false;
    this.
}

Hand.prototype.add = function(card){
    this.cards.push(card);
    this.value+=card.points;
    this.

}
Hand.prototype.value = function(){
    var score = 0
    for (var i=0 ; i<this.cards.length; i++){
        if (cards[i].)
        score+=cards[i].points;

    }
}
// game starts, prototype.dealt() deals one card at a time to player
