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
- [Files](#files)

<a id="overview"></a>
## Overview
*This is a spot where we can either place a write-up or an image describing the general flow of our code at the object and function level. Google Drive has a Google Drawing feature that is similar to LucidChart that is free to use if we want to recreate/update Michael's original flowchart.*

<a id="objects"></a>
## Objects

**Audio** The game contains 6 sounds, which are each instantiated on their own line. variables are declared for each sound object, and then a src property is assigned. the oncanplaythrough event is a simple check for an audio file's ability to render. If oncanplaythrough resolves to true, the audio file can be played without load errors. 

**playHitSound()** this function calls the play() method on the audio object[i]stored in the hitSounds array. var sounds holds reference to the object in the array, with a conditional expression that limits soundToPlay from incrementing larger than the number of objects held in the array. this function is called in the eventhandler.

**playIntroSound()** plays intro hook upon re-starting the game

**playStandSound()** plays stand sound, called in eventhandler.



<a id="card"></a>
### **Card**
The Card constructor creates a single Card object. The Card constructor is called multiple times by a Deck which immediately stores the Card in that Deck.

<a id="card-properties"></a>
#### Properties
- **value:** The pip or court value of the card. 
    - ```[2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace]```

- **suit:** The suit of the card. 
    - ```[Hearts, Diamonds, Clubs, Spades]```

- **face:** The face-up or face-down state of the card. 
    - ```[up, down]```

- **src:** The source path for the .png file containing the image associated with the card. This is a string built within the constructor using a prefix, the value and suit property values, and a file extension to complete the path.
    - Example: ```./img/value-suit.png```

<a id="deck"></a>
### **Deck**
The Deck constructor creates a Deck object that can create, store, shuffle, and deal the Cards that will be used during the game.

<a id="deck-properties"></a>
#### Properties
- **inPlay:** An array that contains the Cards that are ready to be dealt.

- **discard:** An array that contains the Cards that are no longer in play.

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
- **.dealt():** This method calls the .add() method of the Player's Hand object, which in turn adds a Card to the Hand.
- **.turn():** TBA
-

<a id="hand"></a>
### Hand

<a id="hand-properties"></a>
#### Properties
- **cards:** An array that stores all of the Cards that have been dealt to the Player.
- **bust:** A boolean that indicates whether the Player's Hand has gone bust.

<a id="hand-methods"></a>
#### Methods
- **.add():** This method adds a Card to the Player's Hand.
*check back on this one*
- **.value():** This methods traverses the Cards in the Player's Hand and generates the sum total of their points. 
*check back on this one*

<a id="functions"></a>
## Functions
*This is where we can detail functions that are completely separate from our objects.*


<a id="files"></a>
## Files
*This might be a good spot to somehow detail the files that we have and how they're linked together (HTML, CSS, JS, .PNGs)*