'use strict';
const Game = require('./lib/game');
const Cards = require('./lib/cards');

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

	let report = '============ GAME OVER =============\n';
	report += `Game Stats:\n`;
	report += `Total Hands: ${game.numHands}\n`;
	report += `Elapsed Time: ${totalTimeSec} ms\n`;
	report += `Hands per ms: ${game.numHands / totalTimeSec}\n`;
	report += `Number of Ties: ${game.numTies}\n`;
	report += '-------------------------------------\n';
	report += `Winner: ${winningPlayer.name}\n`;
	report += `Number of Shuffles: ${winningPlayer.shuffles.length}\n`;
	report += `Shuffles: ${winningPlayer.shuffles.join(', ')}\n`;
	Object.keys(winningPlayer.beginningStats).forEach(stat => {
		report += `${stat}: ${winningPlayer.beginningStats[stat]}\n`;
	});
	report += `Hand Value: winner ${winnerHandValue} : ${loserHandValue}\n`;
	report += `High Hand Value: winner ${winnerHighValue} : ${loserHighValue}\n`;

	report += '=====================================\n';
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
