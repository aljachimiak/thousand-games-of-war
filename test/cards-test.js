import test from 'ava';
import Cards from '../lib/cards';

test('makeDeck returns a deck of the correct number of cards', t => {
	t.plan(2);
	let deck = Cards.makeDeck(13);
	t.is((13 * 4), deck.length);

	deck = Cards.makeDeck(10);
	t.is((10 * 4), deck.length);
});

test('makeDeck returns a default deck if no number is specified', t => {
	t.plan(1);
	const deck = Cards.makeDeck();

	t.is(52, deck.length);
});

test('makeDeck returns a default deck if specified number is too high', t => {
	t.plan(1);
	const deck = Cards.makeDeck(100);

	t.is(52, deck.length);
});

test('makeDeck returns a default deck if specified number is too low', t => {
	t.plan(1);
	const deck = Cards.makeDeck(1);

	t.is(52, deck.length);
});

test('makeDeck returns a default deck if specified number is not a number', t => {
	t.plan(3);
	let deck = Cards.makeDeck('one');
	t.is(52, deck.length);

	deck = Cards.makeDeck({});
	t.is(52, deck.length);

	deck = Cards.makeDeck([]);
	t.is(52, deck.length);
});

test('shuffle returns the same number of cards that were passed in', t => {
	t.plan(1);
	const deck = Cards.makeDeck(13);
	const shuffled = Cards.shuffle(deck);

	t.is(deck.length, shuffled.length);
});

test('isDeck correctly determines non-array is false', t => {
	t.plan(2);
	const strNotDeck = 'blerp';
	const emptyObj = {};

	t.is(false, Cards.isDeck(strNotDeck));
	t.is(false, Cards.isDeck(emptyObj));
});

test('An Array, with a noncard item is not a deck', t => {
	t.plan(2);

	const badDeck = Cards.makeDeck(10);
	badDeck[badDeck.length] = 'joker';

	t.is(false, Cards.isDeck(badDeck));

	const shuffledBadDeck = Cards.shuffle(badDeck);
	t.is(false, Cards.isDeck(shuffledBadDeck));
});

test('isDeck thinks that makeDeck actually makes a real deck', t => {
	t.plan(1);

	const goodDeck = Cards.makeDeck(10);
	t.is(true, Cards.isDeck(goodDeck));
});

test('isDeck correctly identifies that an empty array is not a deck', t => {
	t.plan(1);

	const empty = [];
	t.is(false, Cards.isDeck(empty));
});
