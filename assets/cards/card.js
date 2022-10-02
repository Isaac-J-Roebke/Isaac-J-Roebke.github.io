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
dealer_standing = false;

function total(hand) {
    let total = 0;
    let face_ten = false;

    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value == '10' || hand[i].value == 'J' || hand[i].value == 'Q' || hand[i].value == 'K') {face_ten = true;}
    }

    for (let i = 0; i < hand.length; i++) {
        if (hand[i].value == 'A' && face_ten == true) {total += 1}
        else {total += hand[i].num()}
    }

    return total;
}

function in_hand(y, x) {
    for (let i = 0; i < y.length; i++) {
        if (x.suit == y[i].suit && x.value == y[i].value) {
        return true;
        }
    }
    return false;
}

function add_back_card() {
    let node = document.createElement('img');
    let pth = 'assets/cards/PNG/Cards (large)/card_back.png';
    let alt = 'nn';
    let id = 'curr_card';
    node.src = pth;
    node.alt = alt;
    node.id = id;
    document.getElementById("card_container").appendChild(node);
}

function add_back_card_dealer() {
    let node = document.createElement('img');
    let pth = 'assets/cards/PNG/Cards (large)/card_back.png';
    let alt = 'nn';
    let id = 'deal_card'
    node.src = pth;
    node.alt = alt;
    node.id = id;
    document.getElementById("dealer_container").appendChild(node);
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

        if (y == '0') {y = '10'}
        else if (y == 'n') {y = 'none'}

        if (y === 'none' || x === 'none') {}
        else {temp[count] = new Card(x, y)}

        count++;
    }

    return temp;
}

function getDealerHand() {
    let cards = document.getElementById('dealer_container').children;
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

        if (y == '0') {y = '10'}
        else if (y == 'n') {y = 'none'}

        if (y === 'none' || x === 'none') {}
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

    if (y.length == 2) {y = y.charAt(1)}

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

function add_card_dealer(card) {
    let node = document.createElement('img');
    let pth = getCardPath(card);
    let alt = getAlt(card);
    node.src = pth;
    node.alt = alt;
    document.getElementById("dealer_container").appendChild(node);
}

function rand_card() {
    let temp = getPlayerHand();

    deck = shuffleArray(deck);

    let x = deck[0];

    let i = 1;
    while (true) {
        if (!in_hand(temp, x)) {return x}
        else {
            deck = shuffleArray(deck);
            x = deck[0];
        }
    }
}

function bust() {
    document.getElementById("bust_msg").style.visibility = "visible";
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("play").disabled = true;
    document.getElementById("reset").disabled = false;
}

function win() {
    document.getElementById("win_msg").style.visibility = "visible";
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("play").disabled = true;
    document.getElementById("reset").disabled = false;
}

function lose() {
    document.getElementById("lose_msg").style.visibility = "visible";
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("play").disabled = true;
    document.getElementById("reset").disabled = false;
}

function dealer_turn() {

    if (total(getDealerHand()) >= 17 && total(getDealerHand()) <= 21) {
        dealer_standing = true;
    }
    else if (total(getDealerHand()) > 21) {
        win();
        dealer_standing = true;
    }
    else if (dealer_standing == false) {
        let x = rand_card();
        add_card_dealer(x);
    }
    document.getElementById("dealer_num").textContent = total(getDealerHand());
}

function hit() {
    let x = rand_card();

    add_card(x);

    document.getElementById("player_num").textContent = total(getPlayerHand());

    if (total(getPlayerHand()) > 21) {bust();}
    else if (total(getPlayerHand()) == 21) {win();}
    else {dealer_turn();}
}

function stand() {
    document.getElementById("hit").disabled = true;

    while(dealer_standing == false) {
        dealer_turn();
    }

    document.getElementById("dealer_num").textContent = total(getDealerHand());

    if (total(getDealerHand()) > 21) {
        win();
    }
    else if (total(getDealerHand()) <= total(getPlayerHand())) {
        win();
    } else {
        lose();
    }
}

function reset() {
    document.getElementById("bust_msg").style.visibility = "hidden";
    document.getElementById("win_msg").style.visibility = "hidden";
    document.getElementById("lose_msg").style.visibility = "hidden";
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("play").disabled = false;

    let cards = document.getElementsByTagName("img");

    for (let i = cards.length - 1; i >= 0; i--) {
        cards[i].remove();
    }

    add_back_card();
    add_back_card_dealer();

    document.getElementById("player_num").textContent = "0";
    document.getElementById("dealer_num").textContent = "0";

    deck = freshDeck();
    deck = shuffleArray(deck);
    dealer_standing = false;
}

function replace_backs() {
    let x = rand_card();
    let y = rand_card();

    let x_pth = getCardPath(x);
    let x_alt = getAlt(x);

    let y_pth = getCardPath(y);
    let y_alt = getAlt(y);

    document.getElementById("curr_card").src = x_pth;
    document.getElementById("curr_card").alt = x_alt;

    document.getElementById("deal_card").src = y_pth;
    document.getElementById("deal_card").alt = y_alt;
}

function play() {
    replace_backs();

    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("reset").disabled = true;
    document.getElementById("play").disabled = true;
    
    document.getElementById("player_num").textContent = total(getPlayerHand());
    document.getElementById("dealer_num").textContent = total(getDealerHand());
}