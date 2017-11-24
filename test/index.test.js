'use strict';
/* eslint-disable no-unused-vars */
/* eslint-disable ava/prefer-async-await */

import test from 'ava';
import Thow from '../index';

// let manyGamedata = [];
// test.before(t => {
// 	return Promise.resolve(null)
// 		.then(() => {
// 			return Thow.playManyGames();
// 		})
// 		.then(gameData => {
// 			manyGamedata = gameData;
// 			return null;
// 		});
// });

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
