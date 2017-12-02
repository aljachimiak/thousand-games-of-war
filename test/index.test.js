'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable ava/prefer-async-await */

import test from 'ava';
import Tgow from '../index';

test('playGame works', t => {
	const gameData = Tgow.playGame();
	t.plan(2);
	t.is(2, Object.keys(gameData).length);
	t.is(true, true);
});

test('playManyGames works', t => {
	const gameData = Tgow.playManyGames();
	t.plan(1);
	t.is(1000, gameData.length);
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

test.todo('in a game playhand calls playhand');
test.todo('in a game playhand calls compareTable');
test.todo('in a game playhand calls emptyTable');
test.todo('in a game placeCardsOnTable calls checkHand');
test.todo('in a game with hands of equivalent order and value, a reshuffle occurs');
test.todo('playManyGames will play the specified amount of games');
test.todo('promiseManyGames will play the specified amount of games');
