'use strict';

module.exports = {
	makeDeck,
	shuffle
};

class Card {
	constructor(suit, value) {
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
		'♦️ Diamond',
		'♥️ Heart',
		'♠️ Spade',
		'♣️ Club'
	];

	for (let i = 2; i < numCardsPerSuit + 2; i++) {
		suits.forEach(s => {
			const card = new Card(s, i);
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

// // Cards.deal needs specific args:
// // args.deck [card]
// // args players [players]
// Cards.deal = function (args) {
// 	const deck = args.deck;
// 	const players = args.players;
// 	for (let i = deck.length - 1; i >= 0; i--) {
// 		const card = deck.splice(i, 1);
// 		players[i % 2].hand.push(card[0]);
// 	}
// 	const toReturn = {
// 		deck,
// 		players
// 	};
// 	return toReturn;
// };

// export default {
// 	Cards
// };
