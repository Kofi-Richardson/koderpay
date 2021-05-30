const string = require("../../utilities/string.js");
const pay = async ({ amount, currency, body, payment_type }) => {
  switch (payment_type) {
    case "PAYMENT":
      switch (body.payer_wallet_no) {
        case "0555555550":
          return {
            transaction_status: "SUCCESS",
            processor_payment_reference: string.generateReference(),
            processor_status_code: 000,
            processor_status_message: "Transaction Accepted",
          };
          break;
        case "0599999999":
          return {
            transaction_status: "FAILED",
            processor_payment_reference: string.generateReference(),
            processor_status_code: 999,
            processor_status_message:
              "Transaction Failed. Insufficient Balance",
          };
          break;
        default:
          return {
            transaction_status: "FAILED",
            processor_payment_reference: string.generateReference(),
            processor_status_code: 999,
            processor_status_message: "Invalid Mobile Wallet",
          };
          break;
      }
      break;
    case "REFUND":
      switch (body.payer_wallet_no) {
        case "0555555550":
          return {
            success: true,
            status_code: "RR000",
            message: "Refund Successful",
            payment_details: {},
          };
          break;
        case "0599999999":
          return {
            success: true,
            status_code: "RR000",
            message: "Refund Failed. Operation not Allowed",
            payment_details: {},
          };
          break;
        default:
          return {
            success: true,
            status_code: "RR000",
            message: "Invalid Mobile Wallet",
            payment_details: {},
          };
          break;
      }
  }
};

module.exports = {
  pay,
};
