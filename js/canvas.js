// Targeting Canvas element, setting size, and establishing link to 2d drawing methods (context)
var canvas = document.querySelector('canvas');
console.log(canvas, "I am canvas");
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

var setTable = function(update) {
  // Update determines if we're updating all the cards to new orders or animating a single card.
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
      for(var j in players[i].hand.cards) {
        c.drawImage(players[i].hand.cards[j][0].imgObj, players[i].hand.cards[j][0].x, players[i].hand.cards[j][0].y);
      }
    }  
  } else { // If update is false
    for(var i in players) {
      // Draw all players' cards, except for player 1
      if (players[i].order !== 1){
        for(var j in players[i].hand.cards) {
          c.drawImage(players[i].hand.cards[j][0].imgObj, players[i].hand.cards[j][0].currentX, players[i].hand.cards[j][0].currentY);
        }
      }
    }
  }
};

// Pass a Player and a card index into this function to calculate its destinationX and destinationY
var locate = function(player, cardIndex, update) {
  var player = player;
  var order = player.order;
  var index = cardIndex;
  var update = update; // This determines if we're updating the destination or current coordinates.
  var y;
  var x;
  var height;
  var width;

  if(update){
    if(order < 3) {
      currentY = (order + 1) * 240;
      currentX = (index + 1) * 75;
      height = 120;
      width = 75;
    } else {
      currentY = 30 + ((order - 2) * 90);
      currentX = 600 - (index * 37.5);
      height = 60;
      width = 37.5;
    }
  
    player.hand.cards[index][0].currentX = currentX;
    player.hand.cards[index][0].currentY = currentY;
    player.hand.cards[index][0].height = height;
    player.hand.cards[index][0].width = width;
  } else {
    if(order < 3) {
      destinationY = (order + 1) * 240;
      destinationX = (index + 1) * 75;
      height = 120;
      width = 75;
    } else {
      destinationY = 30 + ((order - 2) * 90);
      destinationX = 600 - (index * 37.5);
      height = 60;
      width = 37.5;
    }

    console.log(player.hand.cards, "I am cards");
    console.log(index, "this is the index");
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
  console.log(thisPlayer, "I am a player");
  let thisCard = thisPlayer.hand.cards;
  console.log(thisCard[thisCard.length -1], "I am the last card");
  let finalCard = thisCard[thisCard.length -1][0];

  // Call the locating() function to update thisPlayer's last card's destinationX and destinationY
  locate(thisPlayer, thisCard.length - 1, false);

  // Draw table's default state and all other player's cards
  setTable();
  
  // Draw thisPlayer's cards which includes the new card
  for (var i in thisPlayer.hand.cards) {
    console.log(thisCard[i][0].imgObj, "I am an imgObj");
    console.log(thisCard[i][0].currentX, "I am a coordinate");
    c.drawImage(thisCard[i][0].imgObj, thisCard[i][0].currentX, thisCard[i][0].currentY, thisCard[i][0].width, thisCard[i][0].height);
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
