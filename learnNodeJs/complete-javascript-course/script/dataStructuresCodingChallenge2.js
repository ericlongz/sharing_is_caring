'use strict';

const game = {
	team1: 'Bayern Munich',
	team2: 'Borrussia Dortmund',
	players: [
		[
			'Neuer',
			'Pavard',
			'Martinez',
			'Alaba',
			'Davies',
			'Kimmich',
			'Goretzka',
			'Coman',
			'Muller',
			'Gnarby',
			'Lewandowski',
		],
		[
			'Burki',
			'Schulz',
			'Hummels',
			'Akanji',
			'Hakimi',
			'Weigl',
			'Witsel',
			'Hazard',
			'Brandt',
			'Sancho',
			'Gotze',
		],
	],
	score: '4.0',
	scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
	date: 'Nov 9th, 2037',
	odds: {
		team1: 1.33,
		x: 3.25,
		team2: 6.5,
	},
};

for (const i of game.scored.entries()) {
	console.log(`Goal ${i[0] + 1}: ${i[1]}`);
}

let avgOdds = 0;
const odds = Object.values(game.odds);
for (const i of odds) {
	avgOdds += i;
}
console.log(avgOdds / odds.length);

for (const i of Object.keys(game.odds)) {
	const teamStr = i !== 'x' ? `victory ${game[i]}` : 'draw';
	console.log(`Odd of ${teamStr}: ${game.odds[i]}`);
}

const scorers = {};
for (const i of game.scored) {
	scorers[i] = scorers[i] ? scorers[i]++ : 1;
}

// for (const player of game.scored) {
// 	scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }

console.log(scorers);
