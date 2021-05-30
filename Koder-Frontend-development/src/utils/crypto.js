import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = process.env.REACT_APP_BACKEND_ENCRYPTION_KEY
//process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

 function  encrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    ENCRYPTION_KEY
  ).toString();
  return ciphertext;
}
function decrypt(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log(ciphertext);
  return originalText;
}

export { encrypt, decrypt };
