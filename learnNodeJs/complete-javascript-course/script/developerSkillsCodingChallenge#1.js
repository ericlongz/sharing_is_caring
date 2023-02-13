let arr1 = [17, 21, 23];
let arr2 = [12, 5, -5, 0, 4];

const printForecast = (arr1) => {
	text = "...";
	for (let i = 0; i < arr1.length; i++) {
		text = text + ` ${arr1[i]}°C in ${i + 1} days ...`;
	}
	return text;
};

console.log(printForecast(arr1));
console.log(printForecast(arr2));
