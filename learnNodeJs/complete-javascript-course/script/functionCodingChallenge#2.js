const tips = [125, 555, 44];

const calcTip = (tips) => {
  let total = [];
  for (let i = 0; i < tips.length; i++) {
    if ((tips[i] >= 50) & (tips[i] <= 300)) {
      total.push(tips[i] + 0.15 * tips[i]);
    } else {
      total.push(tips[i] + 0.2 * tips[i]);
    }
  }
  return total;
};

console.log(calcTip(tips));
