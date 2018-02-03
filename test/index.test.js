'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable ava/prefer-async-await */

import test from 'ava';
import Tgow from '../index';

test('playGame works', t => {
	const gameData = Tgow.playGame();
	t.plan(1);
	t.is(2, Object.keys(gameData).length);
});

test('playManyGames works', t => {
	const gameData = Tgow.playManyGames();
	t.plan(1);
	t.is(1000, gameData.length);
});

test('playManyGames plays specified amount of games', t => {
	const gameData = Tgow.playManyGames(500);
	t.plan(1);
	t.is(500, gameData.length);
});

test('promiseManyGames plays specified amount of games', async t => {
	const gameData = await Tgow.promiseManyGames(500);
	t.plan(1);
	t.is(500, gameData.length);
});

test('promiseManyGames works', async t => {
	const manyGameData = await Tgow.promiseManyGames();
	t.plan(1);
	t.is(1000, manyGameData.length);
});

test('playThousandGames works', t => {
	const gameData = Tgow.playThousandGames();
	t.plan(1);
	t.is(1000, gameData.length);
});

test('promiseThousandGames works', async t => {
	const gameData = await Tgow.promiseThousandGames();
	t.plan(1);
	t.is(1000, gameData.length);
});

test('playGame passes specified deck to playGame', t => {
	t.plan(3);
	let deck = Tgow.Cards.makeDeck();
	deck = Tgow.Cards.shuffle(deck);
	const referenceDeck = deck.slice(0);
	const options = {deck};

	const gameData = Tgow.playGame(options);
	const game = gameData.game;

	// deal uses Array.push to put cards in the deck
	// this places the top of the referenceDeck to
	// go to the back of the player's hand
	const lastIndex = game.players[0].beginningStats.startingHand.length - 1;
	t.is(game.players[0].beginningStats.startingHand[lastIndex], referenceDeck[0]);
	t.is(game.players[1].beginningStats.startingHand[lastIndex], referenceDeck[1]);
	t.is(2, Object.keys(gameData).length);
});

test('playManyGames passes specified deck', t => {
	t.plan(3);
	const numGames = 500;

	let deck = Tgow.Cards.makeDeck();
	deck = Tgow.Cards.shuffle(deck);
	const referenceDeck = deck.slice(0);

	const gameData = Tgow.playManyGames(numGames, deck);
	const game = gameData[0].game;

	// deal uses Array.push to put cards in the deck
	// this places the top of the referenceDeck to
	// go to the back of the player's hand
	const lastIndex = game.players[0].beginningStats.startingHand.length - 1;
	t.is(game.players[0].beginningStats.startingHand[lastIndex], referenceDeck[0]);
	t.is(game.players[1].beginningStats.startingHand[lastIndex], referenceDeck[1]);

	const player1FirstHand = gameData[0].game.players[0].beginningStats.startingHand;
	const player1LastHand = gameData[1].game.players[0].beginningStats.startingHand;
	t.deepEqual(player1FirstHand, player1LastHand);
});

test.todo('in a game playhand calls playhand');
test.todo('in a game playhand calls compareTable');
test.todo('in a game playhand calls emptyTable');
test.todo('in a game placeCardsOnTable calls checkHand');
test.todo('in a game with hands of equivalent order and value, a reshuffle occurs');
