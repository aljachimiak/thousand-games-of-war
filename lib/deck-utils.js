'use strict';

const DIGIST_STR =
	//   0       8       16      24      32      40      48      56     63
	//   v       v       v       v       v       v       v       v      v
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-';

// takes a card and returns it unique id representation as a 64-nary number
function stringifyCard(card) {
	const str = DIGIST_STR[card.id];
	return str;
}

// takes a card and returns it's value as a 64-nary number
function classifyCard(card) {
	const str = DIGIST_STR[card.value];
	return str;
}

// totally stolen from https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript
// function Radix64() {
// 	const digitsStr =
// 	//   0       8       16      24      32      40      48      56     63
// 	//   v       v       v       v       v       v       v       v      v
// 		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-';

// 	const digits = digitsStr.split('');
// 	const digitsMap = {};
// 	for (let i = 0; i < digits.length; i++) {
// 		digitsMap[digits[i]] = i;
// 	}

// 	function fromInt(int32) {
// 		let result = '';
// 		while (int32 !== 0) {
// 			result = digits[int32 & 0x3f] + result;
// 			int32 >>>= 6;
// 			if (int32 === 0) {
// 				break;
// 			}
// 		}
// 		return result;
// 	}

// 	function toInt(digitsStr) {
// 		let result = 0;
// 		const digits = digitsStr.split('');
// 		for (let i = 0; i < digits.length; i++) {
// 			result = (result << 6) + digitsMap[digits[i]];
// 		}
// 		return result;
// 	}
// }

module.exports = {
	stringifyCard,
	classifyCard
};
