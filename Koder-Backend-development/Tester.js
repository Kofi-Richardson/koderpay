const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
//process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16


var ciphertext = CryptoJS.AES.encrypt(JSON.stringify({
  "fee_id": "2",
  "is_card": 1,
  "merchant_id": "1",
  "merchant_card_terminal_id": "1",
  "paid_by": "1",
  "payer_card_no": "1234567890987654",
  "payer_name_on_card": "AKE",
  "payer_card_expiry": "jjjjj",
  "payer_cvv":"332",
  "amount": "100",
  "ccy": "GHS"
  }
),
  ENCRYPTION_KEY
).toString();

console.log(ciphertext);



var bytes = CryptoJS.AES.decrypt("U2FsdGVkX18kBp2ZAx4Q56/8XRZ1Ji5fk6Jjv5A16jx0C9J9Sdee1YGe7ut9YT4p/evEhgiabErwL9h3kMsydA==",
  ENCRYPTION_KEY
);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText);
