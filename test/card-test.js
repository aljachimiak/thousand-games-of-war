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
