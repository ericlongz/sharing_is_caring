const calcAverage = (score1, score2, score3) => {
  return (score1 + score2 + score3) / 3;
};

const checkWinner = (avgDolhins, avgKoalas) => {
  if (avgDolhins >= 2 * avgKoalas) {
    console.log(`Dolhins win 🏆 (${avgDolhins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolhins) {
    console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolhins})`);
  } else {
    console.log("No one win.");
  }
};

checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27));
