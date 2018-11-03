<a id="top"></a>
# Hit Me! - Documentation

## Table of Contents
- [Overview](#overview)
- [Objects](#objects)
    - [Card](#card)
        - [properties](#card-properties)
    - [Deck](#deck)
        - [properties](#deck-properties)
        - [methods](#deck-methods)
    - [Player](#player)
        - [properties](#player-properties)
        - [methods](#player-methods)
    - [Hand](#hand)
        - [properties](#hand-properties)
        - [methods](#hand-methods)
- [Functions](#functions)
    - [Rendering](#rendering)
    - [Game Play](#gamePlay)
    - [Audio](#audio)
    - [Form](#form)

<a id="overview"></a>
## Overview
Hit Me

<a id="objects"></a>
## Objects

<a id="card"></a>
### **Card**
The Card constructor creates a single Card object. The Card constructor is called multiple times by a Deck which immediately stores the Card in that Deck.

<a id="card-properties"></a>
#### Properties
- **value:** The pip or court value of the card. 
    - ```[2, 3, 4, 5, 6, 7, 8, 9, 10, jack, queen, king, ace]```

- **suit:** The suit of the card. 
    - ```[hearts, diamonds, clubs, spades]```

- **src:** The source path for the .png file containing the image associated with the card. This is a string built within the constructor using a prefix, the value and suit property values, and a file extension to complete the path.
    - Example: ```./img/value-suit.png```

- **points:** The point value of the card. Pips's point are equal to their value, court cards are 10 points, and aces default to 11 points (logic within gameplay handles re-evaluating them to 1 point if needed).

- **name:** The full name of the card, created by concatenating the value and suite properties of the card.

<a id="deck"></a>
### **Deck**
The Deck constructor creates a Deck object that can create, store, shuffle, and deal the Cards that will be used during the game.

<a id="deck-properties"></a>
#### Properties
- **inPlay:** An array that contains the Cards that are ready to be dealt.

<a id="deck-methods"></a>
#### Methods
- **.build():** This method allows the Deck to make multiple calls to the Card constructor to build a set of 52 Cards and push them in to its inPlay property array. Multiple calls to this method on the same Deck object would result in having an inPlay property array that contains multiple 'decks' of playing cards.

- **.shuffle():** This method randomly shuffles all Cards remaining within the Deck's inPlay property array.

- **.deal():** This method returns one Card from the inPlay property array by popping a card off the end of the array. 



<a id="player"></a>
### Player

<a id="player-properties"></a>
#### Properties
- **ID:** A string passed into the Player constructor that represents the Player's name.
- **hand:** A Hand object associated with the Player that holds the Player's Cards.
- **playing:** A boolean to assist with turn logic that is true if the Player is still taking actions during their turn and is changed to false when the Player's turn is complete.
- **busted:** A boolean that indicates whether or not the Player has gone bust. 
- **win:** A boolean that is changed to true if a score of 21 has been reached.

<a id="player-methods"></a>
#### Methods
- **.hit():** This method handles: 
  - Telling the Player's Hand to add a Card from the Deck 
  - Creating an image element for the new Card and assigning it a source for its corresponding .png file
  - Making sure that the dealer's first Card's image element' source is set to 'back.png' to keep it hidden from view of the other players.
  - Determining which ```<div>``` the image element needs to be appended to and if the image needs to be scaled down.
  - Determining if the dealers's Hand has been dealt a blackjack, a score of 21, or busted as a result of adding the new Card.
  - Making a call to checkHand() to see if a Player has scored 21 or busted.
  - Making a call to setOrder() to advance to the next player.
- **checkHand():** This method performs a check to see if a Player's Hand has busted or reached a score of 21 after the Player has hit. If either of those conditions has been met, the Player's playing property is set to false and the order of players is adjusted.
- **stay():** This method allows a Player to complete their turn without adding an additional Card to their Hand. It then calls setOrder() to advance to the next player.
- **newGame():** This method is called at the beginning of a new game/round and replaced the Player's Hand with a new Hand and resets their playing property to 'true'.

<a id="hand"></a>
### Hand

<a id="hand-properties"></a>
#### Properties
- **cards:** An array that stores all of the Cards that have been dealt to the Player.
- **bust:** A boolean that indicates whether the Player's Hand has gone bust.
- **score:** The sum total points of all Cards in the Hand.
- **blackjack:** A boolean that indicates whether or not the Hand was dealt a blackjack.
- **ace:** The sum total of aces within the Hand. Used to determine if it is possible to remove 10 points from the score if the Hand is in a 'bust' state.  

<a id="hand-methods"></a>
#### Methods
- **.add():** This method adds a Card to the Player's Hand. It then checks to see if the new card is an ace, if so it increments the Hand's ace property. Once the new Card's points are added to the Hand's score it performs a check to see if the Hand is in a busted state and whether or not there are any aces that can be downgraded to 1 point rather than 10 points.

<a id="functions"></a>
## Functions

<a id="rendering"></a>
### Rendering

#### clearPlayerCards():
- This function iterates over each player's div containing their card images, except for the dealer's, and removes all of the child nodes within that container.

#### movePlayerCards():
- This function handles the steps necessary to move Players' Cards into their new positions after the order of Players has been advanced. It first calls clearPlayerCards() and then iterates over each Player's Cards and appends them to the DOM based on the Player's new order value.

#### clearDealersCards():
- This function clears out the card images in the dealer's div by removing all of the child nodes of that div.

#### newStatus():
- This function appends gameplay messages to the status console on the user interface by appending the messages as list items to a unique unordered list for each round.

#### updateScroll():
***Check with Connor on this one***

<a id="gamePlay"></a>
### Game Play

#### setOrder():
- This function advances each Player's order property so the first Player becomes the last, and each of the other Players advances one value closer to first Player. It then calls movePlayerCards to make sure their Cards are inserted into their new locations on the table.

#### resetOrder():
- This function makes sure that Player's order property is reset between games so the first Player in the players array is the first and so on. The last Player in the array is the dealer, who's order remains at 0.

#### eventhandler():
- This function handles the listener for keypresses during a Player's turn. It calls either *player*.hit() or *player*.stay() depending on the user's keypress. It also contains calls to play sound effects based on the user's input. It then makes a call to nextPlayer() to hand the turn over to the next Player.

#### gamePlay():
- This function handles calls to the top level functions necessary to play a full round of blackjack. This includes setting up the initial state of the table, dealing the cards, and then starting turns. 

#### newRound():
- This function handles the inital set up of the game for a new round. It first makes calls to build a new deck and shuffle it. It then creates a new unordered list in the status console for the gameplay messages to be posted to. Finally, it makes calls to each Player's newGame() method so they're all ready with new Hands and resets their playing property to 'true'.

#### dealCards():
- This function handles dealing of Cards off the Deck in the same order a real blackjack game is dealt (Dealer, players left to right, players right to left, and finally the dealer once more). This is achieved by iterating over our players array backwards and then forwards, having each Player call their hit() method.

#### nextPlayer():
- This function handles running and passing turns from Player to Player until it reaches the dealer. If the current Player is the dealer, then it flips their first Card over for everyone to see and then calls the dealerTurn() function to handle the dealer's unique logic. For all other Players, this function starts up the event listener for keypresses which hands control over to eventHandler(). If the Player already has a blackjack it advances the turn to the next Player.

#### dealerTurn():
- This function handles the unique rules/logic that a dealer has to play by in a blackjack game. This includes hitting if your score is below 17, hitting on a soft 17, and staying on anything over 17.

#### checkScores():
- This function compares all Players scores against the dealer to determine the winner.

#### nextGame():
- This function displays two buttons at the bottom of the table when the round has completed that allows a user to determine whether to start another round with the same Players, or quite to the home page. 


<a id="audio"></a>
### Audio
The game contains 6 sounds, which are each instantiated on their own line. variables are declared for each sound object, and then a src property is assigned. the oncanplaythrough event is a simple check for an audio file's ability to render. If oncanplaythrough resolves to true, the audio file can be played without load errors. 

#### playHitSound(): 
- This function calls the play() method on the audio object[i]stored in the hitSounds array. var sounds holds reference to the object in the array, with a conditional expression that limits soundToPlay from incrementing larger than the number of objects held in the array. this function is called in the eventhandler.

#### playIntroSound(): 
- This function plays intro hook upon re-starting the game

#### playStandSound(): 
- This function plays stand sound, called in eventhandler.


<a id="form"></a>
### Form

#### handleNewGame():
- This is a handler function for the initial form on the home page. It receives user input that specifies the number of players that will be playing the game. It then removes the first form and replaces it with a second form with enough input elements to receive names for each player. This transition is achieved with DOM manipulation.

#### handleNumPlayers();
- This is a handler function for the second form. It takes in the player names, and stores them in an array that is saved to local storage. The saved information in local storage is utilized by another section of our JavaScript to instantiate the Player objects. It then loads game.html for the user so they can begin the game.

#### save():
- This function saves the work of handleNumPlayers() into local storage to be accessed later.