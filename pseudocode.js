Unique objects we need to define:
    -card
    -hand
    -player
    
unshuffledDeck[] //only create this once
globalDeck[] //each new hand re shuffles the unshuffledDeck into here.
table[] //holds all current players
Players[] //holds all players locally
Card constructor 
    -Suit
    -Value
Player constructor 
    each player has a 
    -purse  
    -hand
    ?stats?
Hand
    -user
    -cards in hand
    -value of hand
    -.addCard
    -.hit
    -.stand
    ?.doubleDown
    
Function to create all 52 cards.{
  Runs for [hearts,diamonds,spades,clubs]{
    And creates a [a,2,3,4,5,6,7,8,9,10,j,q,k] of that suit^{
      Push that card to our unshuffled deck
    }
  }
}
Function to shuffle the deck{
    I (Connor) have some ideas for this but am down to hear anything that you guys have in mind :D
}
Function to deal cards to all players{
    random
}
playGame{
    How many players
    Shuffles deck
    Deals
}
