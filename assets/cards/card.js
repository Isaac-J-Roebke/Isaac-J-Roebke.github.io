const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']
const VALUE = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
]

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    num() {
        if (this.value == 'A') {
            return 11;
        }
        else if (this.value == 'J') {
            return 10;
        }
        else if (this.value == 'Q') {
            return 10;
        }
        else if (this.value == 'K') {
            return 10;
        }
        else {
            return parseInt(this.value);
        }
    }
}

function freshDeck() {
    var deck = [];
    var i = 0;
    for (let a =0; a < SUITS.length; a++) {
        for (let b = 0; b < VALUE.length; b++) {
            deck[i] = new Card(SUITS[a], VALUE[b]);
            i++;
        }
    }
    return deck;
}

function shuffleArray(array) {
    let curId = array.length;

    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;

      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
}

deck = freshDeck();
deck = shuffleArray(deck);

function in_hand(hand, card) {
    let bool = false;
    for (let i = 0; i < hand.lenth; i++) {
        if ((card.suit == hand[i].suit) && (card.value == hand[i].value))
        bool = true;
    }
    return bool;
}

function getCardPath(card) {
    card_str = 'assets/cards/PNG/Cards (large)/card_' + card.suit + '_' + card.value + '.png';
    return card_str;
}

function getPlayerHand() {
    let cards = document.getElementById('card_container').children;
    let temp = [];

    let count = 0;
    for (let i = 0; i < cards.length; i++) {
        let x = cards[i].alt.charAt(0);
        let y = cards[i].alt.charAt(1);

        if (x == 's') {x = 'spades'}
        else if (x == 'c') {x = 'clubs'}
        else if (x == 'h') {x = 'hearts'}
        else if (x == 'd') {x = 'diamonds'}
        else if (x == 'n') {x = 'none'}

        y = '0' + y;

        if (y == '0A') {y = 'A'}
        else if (y == '00') {y = '10'}
        else if (y == '0J') {y = 'J'}
        else if (y == '0Q') {y = 'Q'}
        else if (y == '0K') {y = 'K'}
        else if (y == '0n') {y = 'none'}


        if (y == 'none' || x == 'none') {}
        else {temp[count] = new Card(x, y)}

        count++;
    }

    return temp;
}

function getAlt(card) {
    let x = card.suit;
    let y = card.value;

    if (x == 'spades') {x = 's'}
    else if (x == 'clubs') {x = 'c'}
    else if (x == 'hearts') {x = 'h'}
    else if (x == 'diamonds') {x = 'd'}
    else if (x == 'none') {x = 'n'}

    if (y.lenth == 2) {y = y.charAt(1)}

    if (y == 'A') {y = 'A'}
    else if (y == '10') {y = '0'}
    else if (y == 'J') {y = 'J'}
    else if (y == 'Q') {y = 'Q'}
    else if (y == 'K') {y = 'K'}
    else if (y == 'none') {y = 'n'}

    let str = x + y;

    return str;
}

function add_card(card) {
    let node = document.createElement('img');
    let pth = getCardPath(card);
    let alt = getAlt(card);
    node.src = pth;
    node.alt = alt;
    document.getElementById("card_container").appendChild(node);
}

function rand_card() {
    let temp = getPlayerHand();

    deck = shuffleArray(deck);

    let x = deck[0];

    let i = 1;
    while (in_hand(temp, x)) {
        x = deck[i];
        i++;
    }

    return x;
}

function choice() {
    let x = rand_card();

    add_card(x);
}

function play() {
    //todo game logic

}