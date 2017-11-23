import Cards from './cards';

class Player {
	constructor(name) {
		this.name = name;
		this.hand = [];
		this.winnings = [];
		this.shuffles = [];
		this.beginningStats = {};
	}

	makeBeginningStats() {
		let startJ = 0;
		let startQ = 0;
		let startK = 0;
		let startA = 0;
		let handValue = 0;
		let highValues = 0;

		this.hand.forEach(card => {
			switch (card.value) {
				case 11:
					startJ++;
					break;
				case 12:
					startQ++;
					break;
				case 13:
					startK++;
					break;
				case 14:
					startA++;
					break;
				default:
					break;
			}

			handValue += card.value;

			if (card.value > 7) {
				highValues += card.value;
			}
		});
		this.beginningStats = {
			startJ,
			startQ,
			startK,
			startA,
			handValue,
			highValues
		};
	}
}

const deck = Cards.makeDeck(52);
const player1 = new Player('Ali');
const player2 = new Player('Bob');

console.log(deck);
console.log(player1, player2);
