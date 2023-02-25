exports.generateNewOtp = (length) => {
  let otp = "";
  const possibleNums = "123456789";
  for (var idx = 0; idx < length; idx++) {
    const indexToTake = Math.floor(Math.random() * possibleNums.length);
    otp += idx > 0 && idx == indexToTake ? "0" : possibleNums[indexToTake];
  }
  return Number(otp);
};
