// eslint disable import/default

import test from 'ava';
// import Cards from '../lib/cards';
// import Player from '../lib/player';
import Game from '../lib/game';

test('game has specified components after init', t => {
	t.plan(8);

	const game = new Game();
	// console.log(game.gameStart);
	t.is(2, game.players.length);
	t.is(2, Object.keys(game.table).length);
	t.is(0, game.numHands);
	t.is(0, game.numTies);
	t.is(false, game.gameComplete);
	t.is(true, game.gameStart > 0);
	t.is('', game.gameEnd);
	t.is(-1, game.gameWinner);
});

test('a new game deals the correct number of cards to each player', t => {
	t.plan(2);
	const game = new Game();
	t.is(game.players[0].hand.length, game.players[1].hand.length);
	t.not(game.players[0].hand.length, 0);
});
