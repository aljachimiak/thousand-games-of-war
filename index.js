'use strict';
const Game = require('./lib/game');
const Cards = require('./lib/cards');
const DeckUtils = require('./lib/deck-utils');

module.exports = {
	playGame,
	playManyGames,
	promiseManyGames,
	playThousandGames,
	promiseThousandGames,
	Cards
};

function playGame(options = {}) {
	const game = new Game(options);

	while (!game.gameComplete) {
		game.playHand(false);
	}

	const totalTimeSec = game.gameEnd - game.gameStart;
	const winningPlayer = game.players[game.gameWinner];
	const loser = game.gameWinner === 1 ? 0 : 1;
	const losingPlayer = game.players[loser];

	const winnerHandValue = winningPlayer.beginningStats.handValue;
	const loserHandValue = losingPlayer.beginningStats.handValue;

	const winnerHighValue = winningPlayer.beginningStats.highValues;
	const loserHighValue = losingPlayer.beginningStats.highValues;

	let deckString = '';
	let deckClass = '';

	game.deck.forEach(c => {
		deckString += DeckUtils.stringifyCard(c);
		deckClass += DeckUtils.classifyCard(c);
	});

	const report = {
		totalHands: game.numHands,
		reportedTimeMs: totalTimeSec,
		numTies: game.numTies,
		winnerName: winningPlayer.name,
		winnerNumShuffles: winningPlayer.shuffles.length,
		winnerShuffles: winningPlayer.shuffles.join(', '),
		handValueWinner: winnerHandValue,
		handValueLoser: loserHandValue,
		highCardsValueWinner: winnerHighValue,
		highCardsValueLoser: loserHighValue,
		deckString,
		deckClass
	};

	return {game, report};
}

function playManyGames(numGames = 1000, deck = {}) {
	if (!Number.isInteger(numGames)) {
		numGames = 1000;
	}
	if (numGames > 1000 || numGames < 1) {
		numGames = 1000;
	}

	const options = {deck};
	let decks;

	if (Cards.isDeck(deck)) {
		decks = [];
		for (let i = 0; i < numGames; i++) {
			const newDeck = deck.slice(0);
			decks.push(newDeck);
		}
	}
	const gameStorage = [];
	for (let j = 0; j < numGames; j++) {
		if (decks) {
			options.deck = decks[j];
		}
		gameStorage.push(playGame(options));
	}
	return gameStorage;
}

function promiseManyGames(numGames = 1000, deck = {}) {
	if (!Number.isInteger(numGames)) {
		numGames = 1000;
	}
	if (numGames > 1000 || numGames < 1) {
		numGames = 1000;
	}

	const games = [];
	const options = {deck};
	let decks;

	if (Cards.isDeck(deck)) {
		decks = [];
		for (let i = 0; i < numGames; i++) {
			const newDeck = deck.slice(0);
			decks.push(newDeck);
		}
	}

	function promiseGame(args) {
		return Promise.resolve()
			.then(() => {
				return playGame(args);
			});
	}

	for (let j = 0; j < numGames; j++) {
		if (decks) {
			options.deck = decks[j];
		}
		games.push(promiseGame(options));
	}

	return Promise.resolve(null)
		.then(() => {
			return Promise.all(games);
		});
}

function playThousandGames(deck = {}) {
	return playManyGames(1000, deck);
}

function promiseThousandGames(deck = {}) {
	return promiseManyGames(1000, deck);
}
