import test from 'ava';
import Cards from '../lib/cards';

test('a card has a name, val, and suit', t => {
	t.plan(3);
	const deck = Cards.makeDeck(3);
	const card = deck[0];

	t.is('string', typeof (card.name()));

	const val = (card.value).toString();
	t.is(true, card.name().indexOf(val) > -1);

	const suit = card.suit;
	t.is(true, card.name().indexOf(suit) > -1);
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
