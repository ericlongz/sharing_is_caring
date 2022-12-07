module.exports = () => {
  var phoneNumber = "^aci.*ct$b";
  var a = /^\^/;
  var b = /\$$/;
  var c = /^\^.{1,}\.\*.{1,}\$$/;
  var phoneResult = c.test(phoneNumber);
  console.log("phone:" + phoneResult);
};
