'use strict';
const Game = require('./lib/game');

module.exports = {
	playGame,
	playManyGames,
	promiseManyGames
};

function playGame() {
	const game = new Game();

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

function playManyGames(numGames = 1000) {
	if (!Number.isInteger(numGames)) {
		numGames = 1000;
	}
	if (numGames > 1000 || numGames < 1) {
		numGames = 100;
	}

	const gameStorage = [];
	for (let i = 0; i < 1000; i++) {
		gameStorage.push(playGame());
	}
	return gameStorage;
}

function promiseManyGames(numGames = 1000) {
	if (!Number.isInteger(numGames)) {
		numGames = 1000;
	}
	if (numGames > 1000 || numGames < 1) {
		numGames = 100;
	}

	const games = [];

	function promiseGame() {
		return Promise.resolve()
			.then(() => {
				return playGame();
			});
	}

	for (let i = 0; i < numGames; i++) {
		games.push(promiseGame());
	}

	return Promise.resolve(null)
		.then(() => {
			return Promise.all(games);
		});
}
