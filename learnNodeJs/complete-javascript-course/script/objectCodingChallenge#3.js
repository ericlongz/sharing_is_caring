let person1Mass = 78;
let person1Height = 1.69;
let person2Mass = 92;
let person2Height = 1.95;

const person1 = {
  name: "Mark Miller",
  mass: person1Mass,
  height: person1Height,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const person2 = {
  name: "John Smith",
  mass: person2Mass,
  height: person2Height,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

if (person1.calcBMI() > person2.calcBMI()) {
  console.log(
    `Mark's BMI (${person1.BMI}) is higher than John's BMI (${person2.BMI}).`
  );
} else {
  console.log(
    `John's BMI (${person2.BMI}) is higher than Mark's BMI (${person1.BMI}).`
  );
}
