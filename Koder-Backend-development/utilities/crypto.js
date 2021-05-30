const CryptoJS = require("crypto-js");
var {
  APP_ENCRYPTION_KEY
} = require("../config");

const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    APP_ENCRYPTION_KEY
  ).toString();
  return ciphertext;
}
function decrypt(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, APP_ENCRYPTION_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(ciphertext)
  return originalText;
}
module.exports = {
  encrypt,
  decrypt,
};
