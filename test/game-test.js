// eslint disable import/default

import test from 'ava';
import Cards from '../lib/cards';
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

test('a new game with a specified deck option uses the correct deck', t => {
	t.plan(4);
	let deck = Cards.makeDeck(10);
	deck = Cards.shuffle(deck);
	const referenceDeck = deck.slice(0);
	const options = {deck};
	const game = new Game(options);
	t.is(game.players[0].hand.length, game.players[1].hand.length);

	// the deck has 40 cards, so a hand will have 20
	t.is(game.players[0].hand.length, 20);

	// deal uses Array.push to put cards in the deck
	// this places the top of the referenceDeck to
	// go to the back of the player's hand
	const lastIndex = game.players[0].hand.length - 1;
	t.is(game.players[0].hand[lastIndex], referenceDeck[0]);
	t.is(game.players[1].hand[lastIndex], referenceDeck[1]);
});
