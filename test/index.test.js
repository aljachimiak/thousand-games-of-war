'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable ava/prefer-async-await */

import test from 'ava';
import Thow from '../index';

test('playGame works', t => {
	const gameData = Thow.playGame();
	t.plan(2);
	t.is(2, Object.keys(gameData).length);
	t.is(true, true);
});

test('playManyGames works', t => {
	const gameData = Thow.playManyGames();
	t.plan(2);
	t.is(1000, gameData.length);
	t.is(true, true);
});

test('promiseManyGames works', async t => {
	const manyGameData = await Thow.promiseManyGames();
	t.plan(1);
	t.is(1000, manyGameData.length);
});

test.todo('in a game playhand calls playhand');
test.todo('in a game playhand calls compareTable');
test.todo('in a game playhand calls emptyTable');
test.todo('in a game placeCardsOnTable calls checkHand');
test.todo('in a game with hands of equivalent order and value, a reshuffle occurs');
