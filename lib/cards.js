'use strict';

class Card {
	constructor(suit, value, suitIndex) {
		this.suit = suit;
		this.value = parseInt(value, 10);
		this.name = function () {
			const value = this.value;
			const suit = this.suit;
			let num = 0;
			if (value < 11) {
				num = value.toString();
			} else if (value === 14) {
				num = 'A';
			} else {
				switch (value) {
					case 11:
						num = 'J';
						break;
					case 12:
						num = 'Q';
						break;
					case 13:
						num = 'K';
						break;
					default:
						break;
				}
			}
			return `${num} of ${suit}s`;
		};
		this.id = (suitIndex * 14) + value;
	}
}

function makeDeck(numCardsPerSuit = 13) {
	if (!Number.isInteger(numCardsPerSuit)) {
		numCardsPerSuit = 13;
	}
	if (numCardsPerSuit > 13 || numCardsPerSuit < 2) {
		numCardsPerSuit = 13;
	}
	const deck = [];
	const suits = [
		'♣️ Club',
		'♦️ Diamond',
		'♥️ Heart',
		'♠️ Spade'
	];

	for (let i = 2; i < numCardsPerSuit + 2; i++) {
		suits.forEach((s, index) => {
			const card = new Card(s, i, index);
			deck.push(card);
		});
	}
	return deck;
}

function shuffle(deck) {
	if (!Array.isArray(deck)) {
		return deck;
	}
	// prevent mutation of the deck that was passed in
	const toShuffle = deck.slice(0);
	const newDeck = [];

	while (toShuffle.length > 0) {
		const randoIndex = Math.floor(Math.random() * toShuffle.length);

		const card = toShuffle.splice(randoIndex, 1);
		newDeck.push(card[0]);
	}
	return newDeck;
}

function isDeck(deck) {
	// deck must be an array with 2 things in it
	if (!Array.isArray(deck) || deck.length < 2) {
		return false;
	}

	// deck must be full of cards
	return deck.every(c => {
		return (c instanceof Card);
	});
}

module.exports = {
	makeDeck,
	shuffle,
	isDeck
};
