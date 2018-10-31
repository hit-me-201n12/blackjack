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

// Pass a Player and a card index into this function to calculate its destinationX and destinationY
var locate = function(player, cardIndex, update) {
  var player = player;
  var position = player.position;
  var index = cardIndex;
  var update = update; // This determines if we're updating the destination or current coordinates.
  var y;
  var x;
  var height;
  var width;

  if(update){
    if(position < 3) {
      destinationY = (position + 1) * 240;
      destinationX = (index + 1) * 75;
      height = 120;
      width = 75;
    } else {
      destinationY = 30 + ((position - 2) * 90);
      destinationX = 600 - (index * 37.5);
      height = 60;
      width = 37.5;
    }
  
    player.hand.cards[index][0].destinationX = destinationX;
    player.hand.cards[index][0].destinationY = destinationY;
    player.hand.cards[index][0].height = height;
    player.hand.cards[index][0].width = width;
  } else {

    if(position < 3) {
      destinationY = (position + 1) * 240;
      destinationX = (index + 1) * 75;
      height = 120;
      width = 75;
    } else {
      destinationY = 30 + ((position - 2) * 90);
      destinationX = 600 - (index * 37.5);
      height = 60;
      width = 37.5;
    }
  
    player.hand.cards[index][0].destinationX = destinationX;
    player.hand.cards[index][0].destinationY = destinationY;
    player.hand.cards[index][0].height = height;
    player.hand.cards[index][0].width = width;
  }
}

var updateTable = function(){
  for(var i = 0 ; i < players.length ; i++){
    for(var j = 0 ; j < players[i].hand.cards.length ; j++){
      locate(players[i], j, true);
    }
  }
  setTable(true);
};

// Pass Players into this function so it can access their entire hand
var animateCard = function(thisPlayer) {
  let thisCard = thisPlayer.hand.card;
  let finalCard = thisCard[-1];

  // Call the locating() function to update thisPlayer's last card's destinationX and destinationY
  locate(thisPlayer, -1, false);

  // Draw table's default state and all other player's cards
  setTable();
  
  // Draw thisPlayer's cards which includes the new card
  for (var i in thisPlayer.hand.cards) {
    c.drawImage(thisCard[i].imgObj, thisCard[i].x, thisCard[i].y, thisCard[i].width, thisCard[i].height);
  }

  // Increment the currentX and currentY properties of thisPlayer's last card
  if(finalCard.currentX < finalCard.destinationX){
    finalCard.currentX += 1;
  }
  if(finalCard.currentY < finalCard.destinationY){
    finalCard.currentY +=1;
  }
  
  // Repeat by calling the window.requestAnimationFrame(animateCard) until thisPlayer's last card's current and desination coordinates are equal
  if(finalCard.currentX  <= finalCard.destinationX && finalCard.currentY <= finalCard.destinationY) {
    window.requestAnimationFrame(animateCard);
  }
};
