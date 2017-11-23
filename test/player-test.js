import test from 'ava';
import Cards from '../cards';
import Player from '../player';

test('player has a name', t => {
	t.plan(1);
	const player1 = new Player('Al');
	t.is(player1.name, 'Al');
});

test('player has a hand, winnings, and shuffles', t => {
	t.plan(3);
	const player1 = new Player('Al');
	t.is(Array.isArray(player1.hand), true);
	t.is(Array.isArray(player1.winnings), true);
	t.is(Array.isArray(player1.shuffles), true);
});

test('player has accurate beginning stats', t => {
	t.plan(6);
	const player1 = new Player('Al');
	const deck = Cards.makeDeck(13);
	player1.hand = deck;
	player1.makeBeginningStats();

	t.is(player1.beginningStats.startJ, 4);
	t.is(player1.beginningStats.startQ, 4);
	t.is(player1.beginningStats.startK, 4);
	t.is(player1.beginningStats.startA, 4);

	let deckValue = 0;
	let deckHighValues = 0;

	deck.forEach(c => {
		deckValue += c.value;
		if (c.value > 7) {
			deckHighValues += c.value;
		}
	});

	t.is(deckValue, player1.beginningStats.handValue);
	t.is(deckHighValues, player1.beginningStats.highValues);
});
