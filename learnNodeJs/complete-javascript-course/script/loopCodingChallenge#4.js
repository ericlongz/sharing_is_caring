const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const calcTip = (bills) => {
	let tips = [];
	let total = [];
	for (let i = 0; i < bills.length; i++) {
		if ((bills[i] >= 50) & (bills[i] <= 300)) {
			tipsValue = 0.15 * bills[i];
			tips.push(tipsValue);
			total.push(bills[i] + tipsValue);
		} else {
			tipsValue = 0.2 * bills[i];
			tips.push(tipsValue);
			total.push(bills[i] + tipsValue);
		}
	}
	return [total, tips];
};

let total = calcTip(bills)[0];
let tips = calcTip(bills)[1];

console.log(bills);
console.log(tips);
console.log(total);

const calcAverage = (arr) => {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum = sum + arr[i];
	}
	return sum / arr.length;
};

console.log(calcAverage(total));
console.log(calcAverage(tips));
