'use strict';

const Cards = require('./cards');
const Player = require('./player');

class Game {
	constructor(options = {}) {
		this.players = [];
		this.table = {
			player0: [],
			player1: []
		};
		this.numHands = 0;
		this.numTies = 0;
		this.gameComplete = false;
		this.gameStart = new Date().getTime();
		this.gameEnd = '';
		this.gameWinner = -1;

		// create players
		const player1 = new Player('Ali');
		const player2 = new Player('Bob');
		let deck;

		if (options.deck && Cards.isDeck(options.deck)) {
			deck = options.deck;
		} else {
			deck = Cards.makeDeck(13);
			deck = Cards.shuffle(deck);
		}

		const newData = this.deal({
			deck,
			players: [player1, player2]
		});

		this.players = newData.players;

		this.players.forEach(p => {
			p.makeBeginningStats();
		});
	}

	// args.deck [card]
	// args players [player]
	deal(args) {
		const deck = args.deck;
		const players = args.players;
		for (let i = deck.length - 1; i >= 0; i--) {
			const card = deck.splice(i, 1);
			players[i % 2].hand.push(card[0]);
		}
		const toReturn = {
			deck,
			players
		};
		return toReturn;
	}

	playHand(isTie) {
		this.placeCardsOnTable(isTie ? 2 : 1);
		const winner = this.compareTable();
		if (winner === -1) {
			this.numTies++;
			return this.playHand(true);
		}

		// assign winnings
		const allCards = this.emptyTable();
		this.players[winner].winnings = this.players[winner].winnings.concat(allCards);

		const totalWinnersCards = this.players[winner].winnings.length + this.players[winner].hand.length;
		this.numHands++;
		if (totalWinnersCards === 52) {
			this.gameComplete = true;
			this.gameEnd = new Date().getTime();
			this.gameWinner = winner;
		}
	}

	placeCardsOnTable(numCards) {
		for (let i = 0; i < numCards; i++) {
			this.players.forEach((p, index) => {
				this.checkHand(p);
				const card = p.hand.pop();

				// card will be undefined if player has 0 in hand and 0 winnings
				if (card) {
					this.table[`player${index}`].push(card);
				}
			});
		}
	}

	compareTable() {
		const val0 = this.table.player0[this.table.player0.length - 1].value;
		const val1 = this.table.player1[this.table.player1.length - 1].value;

		if (val0 > val1) {
			// player 0 wins
			return 0;
		} else if (val1 > val0) {
			// player 1 wins
			return 1;
		}

		// tie
		return -1;
	}

	emptyTable() {
		const allCards = this.table.player0.concat(this.table.player1);
		this.table.player0 = [];
		this.table.player1 = [];
		return allCards;
	}

	checkHand(player) {
		if (player.hand.length === 0) {
			const numCards = player.winnings.length;
			// place shuffled winnings in hand
			player.hand = Cards.shuffle(player.winnings);

			// track shuffle
			player.shuffles.push(numCards);

			// empty winnings
			player.winnings = [];
		}
	}
}

module.exports = Game;
