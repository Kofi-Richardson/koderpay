const MaskData = require("maskdata");

 function maskCardNumber(cardNumber) {
  const maskCardOptions = {
    maskWith: "X",
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 1,
  };
  return  MaskData.maskCard(cardNumber, maskCardOptions);
}

module.exports = {
    maskCardNumber,
};
