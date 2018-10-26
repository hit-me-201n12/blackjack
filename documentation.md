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
- [Functions](#functions)
- [Files](#files)

<a id="overview"></a>
## Overview
*This is a spot where we can either place a write-up or an image describing the general flow of our code at the object and function level. Google Drive has a Google Drawing feature that is similar to LucidChart that is free to use if we want to recreate/update Michael's original flowchart.*

<a id="objects"></a>
## Objects

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
#### Properties
-
-
-
#### Methods
-
-
-


<a id="functions"></a>
## Functions
*This is where we can detail functions that are completely separate from our objects.*


<a id="files"></a>
## Files
*This might be a good spot to somehow detail the files that we have and how they're linked together (HTML, CSS, JS, .PNGs)*