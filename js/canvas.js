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
startingTable();

/
var setTable = function(update) {
  // Update determines if we're updating all the cards to new positions or animating a single card.
  var update = update || false;
  
  // Clear the Canvas
  c.clearRect(0, 0, canvas.width, canvas.height);
  // Draw default images
  var img = new Image();
  img.src = 'img/back.png';
  c.drawImage(img, 0, 0);

  
  // If update is true, draw all players' cards
  if (update) {
    for(var i in players) {
      for(var j in players[i].hand) {
        c.drawImage(players[i].hand.cards[j].imgObj, players[i].hand.cards[j].x, players[i].hand.cards[j].y);
      }
    }  
  } else { // If update is false
    for(var i in players) {
      // Draw all players' cards, except for player 1
      if (players[i].position !== 1){
        for(var j in players[i].hand) {
          c.drawImage(players[i].hand.cards[j].imgObj, players[i].hand.cards[j].x, players[i].hand.cards[j].y);
        }
      }
    }
  }
};

var locating = function(thisPlayer) {

}

// Pass player's into this function so it can access their entire hand
var animateCard = function(thisPlayer) {
  // Call the locating() function to update thisPlayer's last card's destinationX and destinationY
  
  // Draw table's default state and all other player's cards
  setTable();

  // Draw thisPlayer's cards which includes the new card

  // Increment the currentX and currentY properties of thisPlayer's last card

  // Repeat by calling the window.requestAnimationFrame(animateCard) until thisPlayer's last card's current and desination coordinates are equal

};
