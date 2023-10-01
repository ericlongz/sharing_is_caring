// let country = 'Indonesia';
// let continent = 'Asia';
// let population = 273.8;
// let isIsland = true;
// let language;

// console.log(typeof country);
// console.log(continent);
// console.log(typeof population);
// console.log(typeof isIsland);
// console.log(typeof language);

// language = 'Bahasa';

// let halfPopulation = population / 2;
// console.log(halfPopulation);

// console.log(population);
// console.log(++population);

// let finlandPop = 6;
// let isFinlandLarger = finlandPop > population;
// console.log(isFinlandLarger);

// let avgPop = 33;
// let isAvgLarger = avgPop > population;
// console.log(isAvgLarger);

// let description =
// 	country +
// 	' is in ' +
// 	continent +
// 	', and its ' +
// 	population +
// 	' million people speak ' +
// 	language;
// console.log(description);

// description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;

// console.log(description);

// if (population > 33) {
// 	console.log(`${country}'s population is above average`);
// } else {
// 	console.log(
// 		`${country}'s population is ${33 - population} million below average`
// 	);
// }

// let numNeighbours = Number(
// 	prompt('How many neighbour countries does your country have?')
// );

// if (numNeighbours === 1) console.log('Only 1 border!');
// else if (numNeighbours > 1) console.log('More than 1 border');
// else console.log('No borders');

// let isEnglish = language === 'English';
// let isLess50Million = population < 50;

// if (isEnglish && isLess50Million && !isIsland) {
// 	console.log(`You should live in ${country}`);
// } else {
// 	console.log(`${country} does not meet your criteria`);
// }

// switch (language) {
// 	case 'chinese':
// 	case 'mandarin':
// 		console.log('MOST number of native speakers!');
// 		break;
// 	case 'spanish':
// 		console.log('2nd place in number of native speakers');
// 		break;
// 	case 'english':
// 		console.log('3rd place');
// 		break;
// 	case 'hindi':
// 		console.log('Number 4');
// 		break;
// 	case 'arabic':
// 		console.log('5th most spoken language');
// 		break;
// 	default:
// 		console.log('Great language too :D');
// 		break;
// }

// console.log(
// 	`${country}'s population is ${population > 33 ? 'above' : 'below'} average`
// );

//PART 2
// let describeCountry = (country, population, capitalCity) => {
// 	return `${country} has ${population} million people and its capital city is ${capitalCity}`;
// };

// let indonesia = describeCountry('Indonesia', 1, 'Jakarta');
// let singapura = describeCountry('Singapura', 2, 'Singapura');
// let malaysia = describeCountry('Malaysia', 3, 'Kuala Lumpur');

// console.log(indonesia);
// console.log(singapura);
// console.log(malaysia);

const worldPopulation = 7900;

// console.log(percentageOfWorld1(2000));
// function declaration
function percentageOfWorld1(population) {
	return (population / worldPopulation) * 100 + '%';
}

// console.log(percentageOfWorld2(2000));
// function expression
// let percentageOfWorld2 = function (population) {
// 	return (population / worldPopulation) * 100 + '%';
// };

// arrow function
// let percentageOfWorld3 = (country, population) => {
// 	return (population / worldPopulation) * 100 + '%';
// };

// let describePopulation = (country, population) => {
// 	return `${country} has ${population} million people, which is about ${percentageOfWorld1(
// 		population
// 	)} of the world`;
// };

// console.log(describePopulation('China', 1441));

let populations = [100, 150, 200, 250];

// console.log(populations.length === 4);

percentages = [
	percentageOfWorld1(populations[0]),
	percentageOfWorld1(populations[1]),
	percentageOfWorld1(populations[2]),
	percentageOfWorld1(populations[3]),
];

console.log(percentages);

// let neighbours = ['Singapura', 'Malaysia', 'Australia', 'Brunei'];

// neighbours.push('Utopia');
// console.log(neighbours);

// neighbours.pop('Utopia');
// console.log(neighbours);

// if (!neighbours.includes('Germany')) {
// 	console.log('Probably not a central European country :D');
// }

// neighbours[neighbours.indexOf('Malaysia')] = 'Malay';
// console.log(neighbours);

// let myCountry = {
// 	country: 'Indonesia',
// 	capital: 'Jakarta',
// 	language: 'Bahasa',
// 	population: 263.8,
// 	neighbours: ['Singapore', 'Malaysia'],
// 	describe() {
// 		console.log(
// 			`${this.country} has ${this.population} million finnish-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`
// 		);
// 	},
// 	checkIsland() {
// 		if (this.neighbours.length < 1) {
// 			isIsland = true;
// 		} else {
// 			isIsland = false;
// 		}
// 	},
// };

// console.log(myCountry);

// console.log(
// 	`${myCountry.country} has ${myCountry.population} million finnish-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
// );

// myCountry.population = myCountry.population + 2;
// console.log(myCountry.population);

// myCountry['population'] = myCountry['population'] - 2;
// console.log(myCountry['population']);

// myCountry.describe();
// myCountry.checkIsland();
// console.log(isIsland);

percentages2 = [];
for (let i = 0; i < populations.length; i++) {
	percentages2.push(percentageOfWorld1(populations[i]));
}

console.log(percentages2);

// let list0fNeighbours = [
// 	['Canada', 'Mexico'],
// 	['Spain'],
// 	['Norway', 'Sweden', 'Russia'],
// ];

// for (let i = 0; i < list0fNeighbours.length; i++) {
// 	for (let j = 0; j < list0fNeighbours[i].length; j++) {
// 		console.log(`Neighbour: ${list0fNeighbours[i][j]}`);
// 	}
// }

let i = 0;
percentage3 = [];
while (i < populations.length) {
	percentage3.push(percentageOfWorld1(populations[i]));
	i++;
}
console.log(percentage3);
