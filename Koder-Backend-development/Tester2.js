const MaskData = require("maskdata");

const cardNumber=4111111111111111;
  const maskCardOptions = {
    // Character to mask the data. Default value is 'X'
    maskWith: "X",
    // If the starting 'n' numbers needs to be unmasked
    // Default value is 4
    unmaskedStartDigits: 4, //Should be positive Integer
    //If the ending 'n' numbers needs to be unmasked
    // Default value is 1. Max possible value is 4
    unmaskedEndDigits: 1, // Should be positive Integer
  };
  const cardAfterMasking =  MaskData.maskCard(cardNumber, maskCardOptions);
console.log(cardAfterMasking)
