const {
  validatePayerID,
  validateTransactionPayload,
} = require("../../models/schema");
const connection = require("../../connection.js");
const crud = require("../db/crud.js");
const string = require("../../utilities/string.js");
const mask = require("../../utilities/mask.js");
const config = require("config");
const mtn = require("../processors/mtn-simulator");
const mastercard = require("../processors/mastercard-simulator");
const visacard = require("../processors/visacard-simulator");
const crypto = require("../../utilities/crypto");
const querystring = require("querystring");
var { APP_HEADERS } = require("../../config");
const logger = require("../../logger.js");
async function getTransactionByPayerID({ payer_id }, res) {
  logger.log("info", payer_id);
  const validatePayerIDResponse = validatePayerID(payer_id);
  logger.log("info", validatePayerIDResponse);
  if (validatePayerIDResponse.error) {
    res.writeHead(400, APP_HEADERS);
    res.write(
      crypto.encrypt({
        success: false,
        status_code: "VV099",
        message: JSON.parse(
          JSON.stringify(validatePayerIDResponse.error.message)
        ),
        fee_details: {},
      })
    );
    res.end();
  } else {
    crud
      .fetchTransactionsByPayer({ payer_id })
      .then(async (transactions) => {
        if (transactions.length > 0) {
          console.log(transactions);
          const decryptedTransaction = transactions.map(transaction => {
            transaction = Object.assign({}, transaction);
            console.log(crypto.decrypt(transaction.payer_card_no))
            transaction.payer_card_no = mask.maskCardNumber(crypto.decrypt(transaction.payer_card_no));
            transaction.payer_name_on_card = crypto.decrypt(transaction.payer_name_on_card);
            transaction.payer_card_expiry = crypto.decrypt(transaction.payer_card_expiry);
            return transaction;
          });
          console.log(decryptedTransaction);
          // transactions.payer_card_no = await mask.maskCardNumber(crypto.decrypt(transactions.payer_card_no));
          // transactions.payer_name_on_card = crypto.decrypt(transactions.payer_name_on_card);
          //   transactions.payer_card_expiry = crypto.decrypt(transactions.payer_card_expiry);
          //  console.log(transactions.payer_card_no);
          //  console.log(transactions.payer_name_on_card);
          //  console.log(transactions.payer_card_expiry);

          res.writeHead(200, APP_HEADERS);
          res.write(
            crypto.encrypt({
              success: true,
              status_code: "TR000",
              message: "Transactions fetch successfully",
              transaction_details: decryptedTransaction,
            })
          );
          res.end();
          return;

        } else {
          res.writeHead(404, APP_HEADERS);
          res.write(
            crypto.encrypt({
              success: true,
              status_code: "-TR000",
              message: "No transaction found for the user",
              transaction_details: {},
            })
          );
          res.end();
        }
      })
      .catch((error) => {
        res.writeHead(400, APP_HEADERS);
        res.write(
          crypto.encrypt({
            message: "There was an error in fetching transaction",
            status_code: "GE099",
            transaction_details: {},
          })
        );
        res.end();
      });
  }
}

//Handle 3rd Party Payment Here
//cryptography.decryptRequest,
//jsonParser,cryptography.decryptRequest,
async function postTransaction(body, res) {
  const payment_type = "PAYMENT";
  let formattedPaymentResponse;
  const validateTransactionPayloadResp = validateTransactionPayload(body);
  logger.log("info", validateTransactionPayloadResp);

  if (validateTransactionPayloadResp.error) {
    res.writeHead(400, APP_HEADERS);
    res.write(
      crypto.encrypt({
        success: false,
        status_code: "VV099",
        message: JSON.parse(
          JSON.stringify(validateTransactionPayloadResp.error.message)
        ),
        fee_details: {},
      })
    );
    res.end();
  } else {
    const is_card = body.is_card;
console.log(body)
    const values = [
      [
        body.fee_id,
        body.is_card,
        body.merchant_id,
        body.merchant_card_terminal_id,
        body.merchant_wallet_terminal_id,
        body.paid_by,
        body.payer_wallet_no,
        body.payer_wallet_telco,
        body.payer_card_no,
        body.payer_name_on_card,
        body.payer_card_expiry,
        body.amount,
        body.ccy,
      ],
    ];
    let cardNo;
    let paperNameOnCard;
    let payerCardExpiry;
    let transactionRef = string.generateReference();

    if (is_card) {
      console.log(body.payer_card_no)
      cardNo = crypto.encrypt(parseInt(body.payer_card_no));
      paperNameOnCard = crypto.encrypt(body.payer_name_on_card);
      payerCardExpiry = crypto.encrypt(body.payer_card_expiry);

      console.log(crypto.decrypt(cardNo))
      //cardNo = await mask.maskCardNumber(body.payer_card_no);
      //logger.log("info", "maskedCard");
      //logger.log("info", cardNo);
      //const cardNo=crypto.encrypt(body.payer_card_no);
      //cardNo = await mask.maskCardNumber(body.payer_card_no);
      // logger.log('info',"maskedCard");
      //logger.log('info',cardNo);
    } else {
      cardNo = body.payer_card_no;
    }
    const securedData = [
      [
        transactionRef,
        body.fee_id,
        body.is_card,
        body.merchant_id,
        body.merchant_card_terminal_id,
        body.merchant_wallet_terminal_id,
        body.paid_by,
        body.payer_wallet_no,
        body.payer_wallet_telco,
        cardNo,
        paperNameOnCard,
        payerCardExpiry,
        body.amount,
        body.ccy,
      ],
    ];

    crud
      .isTransactionRecorded(securedData)
      .catch((n) => {
        res.writeHead(400, APP_HEADERS);
        res.write(
          crypto.encrypt({
            success: false,
            status_code: "TR001",
            message: "Failed to Process Transaction",
            payment_details: {},
          })
        );
        res.end();
      })
      .then((insertId) => {
        crud
          .getPayerDetails({ user_id: body.paid_by })
          .then((payer) => {
            if (is_card) {
              crud
                .getMerchantCardTerminalInfo({
                  merchant_id: body.merchant_id,
                  terminal_id: body.merchant_card_terminal_id,
                })
                .then(async (merchant) => {
                  switch (merchant.scheme) {
                    case "MASTERCARD":
                      try {
                        formattedPaymentResponse = await mastercard.pay(
                          payer,
                          merchant,
                          body,
                          payment_type
                        );
                      } catch (err) {
                        logger.log("info", err);
                      }
                      break;

                    case "VISACARD":
                      try {
                        formattedPaymentResponse = await visacard.pay(
                          payer,
                          merchant,
                          body,
                          payment_type
                        );
                      } catch (err) {
                        logger.log("info", err);
                      }
                      break;
                  }

                  formattedPaymentResponse.id = insertId;
                  if (
                    formattedPaymentResponse.transaction_status != "SUCCESS"
                  ) {
                    crud
                      .updatePayment(formattedPaymentResponse)
                      .then((response) => {
                        res.writeHead(500, APP_HEADERS);
                        res.write(
                          crypto.encrypt({
                            success: false,
                            status_code: "TR001",
                            message:
                              formattedPaymentResponse.processor_status_message,
                            payment_details: {},
                          })
                        );
                        res.end();
                      })
                      .catch((error) => {
                        res.writeHead(500, APP_HEADERS);
                        res.write(
                          crypto.encrypt({
                            success: false,
                            status_code: "GE099",
                            message:
                              formattedPaymentResponse.processor_status_message,
                            payment_details: {},
                          })
                        );
                        res.end();
                      });
                  } else {
                    sequentialQueries();
                  }
                });
            } else {
              crud
                .getMerchantWalletTerminalInfo({
                  merchant_id: body.merchant_id,
                  terminal_id: body.merchant_wallet_terminal_id,
                })
                .then(async (merchant) => {
                  switch (merchant.scheme) {
                    case "MTNMOMO":
                      try {
                        formattedPaymentResponse = await mtn.pay({
                          body,
                          payment_type,
                        });
                      } catch (e) {
                        logger.log("info", e);
                      }
                      break;
                  }
                  logger.log("info", formattedPaymentResponse);
                  formattedPaymentResponse.id = insertId;
                  if (
                    formattedPaymentResponse.transaction_status != "SUCCESS"
                  ) {
                    crud
                      .updatePayment(formattedPaymentResponse)
                      .then((response) => {
                        res.writeHead(500, APP_HEADERS);
                        res.write(
                          crypto.encrypt({
                            success: false,
                            status_code: "TR001",
                            message:
                              formattedPaymentResponse.processor_status_message,
                            payment_details: {},
                          })
                        );
                        res.end();
                      })
                      .catch((error) => {
                        logger.log("info", error);
                        res.writeHead(500, APP_HEADERS);
                        res.write(
                          crypto.encrypt({
                            success: false,
                            status_code: "TR001",
                            message:
                              formattedPaymentResponse.processor_status_message,
                            payment_details: {},
                          })
                        );
                        res.end();
                      });
                  }
                  sequentialQueries();
                });
            }
            async function sequentialQueries() {
              try {
                const updatePaymentPromise = crud.updatePayment(
                  formattedPaymentResponse
                );
                const feeStatusUpdated = crud.isFeeStatusUpdated({
                  status: "PAID",
                  id: body.fee_id,
                });
                const promises = [updatePaymentPromise, feeStatusUpdated];

                const result = await Promise.all(promises);

                res.writeHead(200, APP_HEADERS);
                res.write(
                  crypto.encrypt({
                    success: true,
                    status_code: "TR000",
                    message: "Transaction Successfully Completed",
                    payment_details: {
                      reference:
                        formattedPaymentResponse.processor_payment_reference,
                    },
                  })
                );
                res.end();
              } catch (error) {
                logger.log("info", error);
                res.writeHead(500, APP_HEADERS);
                res.write(
                  crypto.encrypt({
                    success: false,
                    status_code: "GE099",
                    message: "Transaction was Successful but failed to Save",
                    payment_details: {},
                  })
                );
                res.end();
              }
            }
          })
          .catch((error) => {
            res.writeHead(500, APP_HEADERS);
            res.write(
              crypto.encrypt({
                success: false,
                status_code: "GE099",
                message: "There was an internal processing error",
                payment_details: {},
              })
            );
            res.end();
          });
      });
  }
}

module.exports = { getTransactionByPayerID, postTransaction };