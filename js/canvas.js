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

// This function draws the saved state of the table throughout the game
var setTable = function() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  ///// THIS SHOULD BE A DEFAULT TABLE OBJ///////
  // Add in any other details/zones that should be on the table
  var img = new Image();
  img.src = 'img/back.png';
  c.drawImage(img, 0, 0);

  // Draw Existing Cards
  // For all Players in players, draw all Cards in Hand
  for(var i in players) {
    for(var j in players[i].hand) {
      c.drawImage(players[i].hand.cards[j].imgObj, players[i].hand.cards[j].x, players[i].hand.cards[j].y);
    }
  }
};

var animateCard = function() {
  // setTable clears canvas and draws default table
  setTable();
  // draw the card
  var img = new Image();
  img.src = dealt.imgObj.src;

  c.drawImage(img, dealt.x, dealt.y);
  
  // Increment
  if (dealt.x < destinationX){
    dealt.x += 1;
  }
  if (dealt.y < destinationY){
    dealt.y += 1;
  }
  // Repeat
  if(dealt.x < destinationX || dealt.y < destinationY) {
    window.requestAnimationFrame(animateCard);
  }
};


var dealCard = function () {
  // Create CardImg
  dealt = new CardImg('ace', 'spades', 'img/ace-spades.png');


  destinationX = 0 + (75 * (CardImg.allCards.length -1));
  destinationY = 480; //This could change depending on card going to dealer or player
  window.requestAnimationFrame(animateCard);
};
