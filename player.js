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
		const startingHand = this.hand.slice(0);

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
			highValues,
			startingHand
		};
	}
}

module.exports = Player;
