const string = require("../../utilities/string.js");
module.exports.pay = async (payer, merchant, body, payment_type) => {
  switch (payment_type) {
    case "PAYMENT":
      switch (body.payer_card_no) {
        case "5555555555554444":
        case "5555XXXXXXXXXXX4":
          return {
            transaction_status: "SUCCESS",
            processor_payment_reference: string.generateReference(),
            processor_status_code: 000,
            processor_status_message: "Transaction Accepted",
          };
          break;
        case "5105105105105100":
          return {
            transaction_status: "FAILED",
            processor_payment_reference: string.generateReference(),
            processor_status_code: 999,
            processor_status_message: "Card Declined",
          };
          break;
          
        default:
          return {
            transaction_status: "FAILED",
            processor_payment_reference: string.generateReference(),
            processor_status_code: 999,
            processor_status_message: "Invalid Card",
          };
          break;
      }
      break;
    case "REFUND":
      switch (body.payer_card_no) {
        case "5555555555554444":
        case "5555XXXXXXXXXXX4":
          return {
            success: true,
            status_code: "RR000",
            message: "Refund Successful",
            payment_details: {},
          };
          break;
        case "5105105105105100":
          return {
            success: false,
            status_code: "RR000",
            message: "Refund Failed. Operation not Allowed",
            payment_details: {},
          };
          break;
        default:
          return {
            success: false,
            status_code: "RR000",
            message: "Invalid Card. Declined",
            payment_details: {},
          };
          break;
      }
  }
};
