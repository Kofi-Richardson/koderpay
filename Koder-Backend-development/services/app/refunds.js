const { validateRefundPayload } = require("../../models/schema");
const crud = require("../db/crud.js");
const string = require("../../utilities/string.js");
const config = require("config");
const mtn = require("../processors/mtn-simulator");
const mastercard = require("../processors/mastercard-simulator");
const visacard = require("../processors/visacard-simulator");
const crypto = require("../../utilities/crypto");
const querystring = require("querystring");
const logger = require("../../logger.js");
var {
  APP_HEADERS,
} = require("../../config");
function postRefund(body, res) {
  const payment_type = "REFUND";
  const values = [[body.transaction_payment_id, body.reason]];
  const validateRefundPayloadResponse = validateRefundPayload(body);
  logger.log('info',validateRefundPayloadResponse);
  if (validateRefundPayloadResponse.error) {
    res.writeHead(400,APP_HEADERS);
    res.write(
      crypto.encrypt({
        success: false,
        status_code: "VV099",
        message: JSON.parse(
          JSON.stringify(validateRefundPayloadResponse.error.message)
        ),
        fee_details: {},
      })
    );
    res.end();
  }
else{
  //Check if the Transaction actually was successfull??
  crud
    .fetchTransactionStatusByPaymentID({
      payment_id: body.transaction_payment_id,
    })
    .then((status) => {
      logger.log('info',status);

      if (status !== "SUCCESS") {
        res.writeHead(400, APP_HEADERS);
        res.write(
          crypto.encrypt({
            success: false,
            status_code: "VV099",
            message: "Cannot refund a non successful Transaction",
            fee_details: {},
          })
        );
        res.end();
      } else {
        crud.saveRefundRequest(values).then((insertId) => {
          let formattedPaymentResponse;
          //Fetch the Details of the Transaction using the payment id
          crud
            .fetchTransactionByPaymentID({
              payment_id: body.transaction_payment_id,
            })
            .then((transaction) => {
              transaction.payer_card_no=crypto.decrypt(transaction.payer_card_no);
              transaction.payer_name_on_card=crypto.decrypt(transaction.payer_name_on_card);
              transaction.payer_card_expiry=crypto.decrypt(transaction.payer_card_expiry);
              body.payer_card_no=transaction.payer_card_no;
              
              //  logger.log('info',transaction);
              const isCard = transaction.is_card;
              logger.log('info',isCard);

              //Check to to handle card transaction
              if (isCard === 1) {
                crud
                  .getMerchantCardTerminalInfo({
                    merchant_id: transaction.merchant_id,
                    terminal_id: transaction.merchant_card_terminal_id,
                  })
                  .then((merchant) => {
                    crud
                      .getPayerDetails({
                        user_id: transaction.paid_by,
                      })
                      .then(async (payer) => {
                        //Push to Card Payment Processor Here
                        logger.log('info',merchant.scheme)
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
                              logger.log('info',err);
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
                              logger.log('info',err);
                            }
                            break;
                        }
                        if (!formattedPaymentResponse) {
                          res.writeHead(500, APP_HEADERS);
                          res.write(
                            crypto.encrypt({
                              success: false,
                              status_code: "RR001",
                              message: "An internal processing error occured",
                              payment_details: {},
                            })
                          );
                          res.end();
                        }
                        if (!formattedPaymentResponse.success) {
                          res.writeHead(400, APP_HEADERS);
                          res.write(crypto.encrypt(formattedPaymentResponse));
                          res.end();
                          return;
                        }

                        crud
                          .isTransactionUpdated({
                            refunded: 1,
                            id: body.transaction_payment_id,
                          })

                          .then(() => {
                            crud
                              //Fetch the Fee Due tied to Transaction
                              .fetchFeeDueId({
                                paymentId: body.transaction_payment_id,
                              })
                              .then((feesDueID) => {
                                logger.log('info',`feesDueID ${feesDueID}`);
                                crud
                                  //Update the status of the Feee to Unpaid
                                  .isFeeStatusUpdated({
                                    status: "REFUNDED",
                                    id: feesDueID,
                                  })
                                  .then(() => {
                                    res.writeHead(200, APP_HEADERS);
                                    res.write(
                                      crypto.encrypt( formattedPaymentResponse )
                                    );
                                    res.end();
                                  })
                                  .catch(() => {
                                    res.writeHead(500, APP_HEADERS);
                                    res.write(
                                      crypto.encrypt({
                                        success: true,
                                        status_code: "GE099",
                                        message:
                                          "Refund request initiated but failed to complete. Contact Admin.",
                                        payment_details: {},
                                      })
                                    );
                                    res.end();
                                  });
                              });
                          })
                          .catch((error) => {
                            res.writeHead(500, APP_HEADERS);
                            res.write(
                              crypto.encrypt({
                                success: true,
                                status_code: "GE099",
                                message:
                                  "Refund request initiated but failed to complete. Contact Admin.",
                                payment_details: {},
                              })
                            );
                            res.end();
                          });
                      });
                  });
              } else {
                //No Wallet Processor Accepts Service Reversal at the Moment
                //Returning Functionality not Available for Wallet Transactions
                res.writeHead(400, APP_HEADERS);
                res.write(
                  crypto.encrypt({
                    success: false,
                    status_code: "-RR00A",
                    message: "Wallet reversal not supported",
                    payment_details: {},
                  })
                );
                res.end();
                return;
              }
              /*
              {
                crud
                  .getMerchantWalletTerminalInfo({
                    merchant_id: transaction.merchant_id,
                    terminal_id: transaction.merchant_wallet_terminal_id,
                  })
                  .then((merchant) => {
                    crud
                      .getPayerDetails({
                        paid_by: transaction.paid_by,
                      })
                      .then((payer) => {
                        switch (merchant.scheme) {
                          case "MTNMOMO":
                            formattedPaymentResponse = require("../services/mtn")(
                              payer,
                              merchant
                            );
                            break;
                        }
                      });
      
                    formattedPaymentResponse.then((resp) => {
                      res.send(resp);
                    });
                  });
              }
              */
            });
          //Update Transaction based on the response receive from the processor

          //If  the  Processor refund failed, no need to update any record. Just send the failed response

          //Update the Transaction to Refunded if it succeeded

          //id: saveRefund.insertId,
          /*
        
        async function sequentialQueries () {
       
        try
        {
          const saveRefund = await crud.saveRefundRequest(values);
          const isTransactionUpdated= await 
          const fetchFeeDueId=await crud.fetchFeeDueId({paymentId: body.transactionPaymetId,});
          logger.log('info',fetchFeeDueId)
          const isFeeStatusUpdated =await crud.isFeeStatusUpdated({status: "UNPAID",id: feesDueID,});
          const r = {
            success: true,
            status_code: 1308,
            message: "Transaction refund successfully updated ",
            data: { id: saveRefund.insertId, payment_details: req.body },
          };
          res.send(r);
        }
        catch(error){
          logger.log('info',error);
          const e= {
            success: true,
            status_code: 1308,
            message: "Transaction update failed at some point ",
            data: { id: "", payment_details: req.body },
          };
          res.send(e);
        }
        
      }
      
        sequentialQueries ();
        */
        });
      }
    })
    .catch((error) => {
      logger.log('info',error);
      /*
      res.send({
        success: false,
        status_code: "GE099",
        message: "There was an error in completing your request.",
        payment_details: {},
      });
      return;
      */
    });
  }
  //Save Refund Request in the DB First, Storing Payment ID and Reason for Refund
}

//Update if Transaction is refunded

module.exports = { postRefund };