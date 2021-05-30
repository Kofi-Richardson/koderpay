import React from "react";
import BackEndService from "../services/BackEndService";
import {decrypt } from "../utils/crypto";
export default function ConfirmPayment({
  setIsProcessing,
  setPayment,
  setIsProcessed,
  fees,
  paymentPayload,
  setAppState
}) {
  const onClickConfirmPayment = () => {
    console.log(paymentPayload);
    setIsProcessing(true);
    BackEndService.postTransaction(paymentPayload)
      .then((response) => {
        setIsProcessing(false);
        console.log(JSON.parse(decrypt(response.data)));
        setPayment(JSON.parse(decrypt(response.data)));
        setIsProcessed(true);
        setAppState("FINISH")
      })
      .catch((error) => {
        setIsProcessing(false);
        console.log(JSON.parse(decrypt(error.response.data)));
        setPayment(JSON.parse(decrypt(error.response.data)));
        setIsProcessed(true);
        setAppState("FINISH")
      });
  };

  return (
    <div class="content-wrapper" style={{ "min-height": "1416.81px;" }}>
      <div class="row">
        <div class="col-md-3 "></div>
        <div class="col-md-6 ">
          <div class="card ">
            <div class="alert alert-info alert-dismissible">
              <h5>
                <i class="icon fas fa-ban"></i> Payment Confirmation
              </h5>
            </div>
            <address>
              The following are the details of the fee payment yet to be
              completed
              <br />
              <br />
              {`${fees.fee_details[0].surname} ${fees.fee_details[0].middle_name} ${fees.fee_details[0].surname}`}{" "}
              <strong></strong>
              <br />
              Student Registration #
              <strong>{`${fees.fee_details[0].registration_number}`}</strong>
              <br />
            </address>
            <div class="col-6">
              <p class="lead">Payment Method:</p>
              {paymentPayload.is_card === 1 ? (
                paymentPayload.merchant_card_terminal_id == 1 ? (
                  <img src={`/images/mastercard.png`} alt="Mastercard" />
                ) : (
                  <img src={`/images/visacard.png`} alt="Visacard" />
                )
              ) : (
                <img src={`/images/mtn.png`} alt="MTNMomo" />
              )}
            </div>

            <div class="col-6">
              <p class="lead">
                Card / Mobile Wallet #{" "}
                <strong>
                  {paymentPayload.is_card
                    ? paymentPayload.payer_card_no
                    : paymentPayload.payer_wallet_no}
                </strong>
              </p>
            </div>

            <div class="col-12">
              <div class="col-6 col-sm-4">
                <div class="info-box bg-light">
                  <div class="info-box-content">
                    <span class="info-box-text text-center text-muted">
                      Total Amount
                    </span>
                    <span class="info-box-number text-center  mb-0 lead">
                      GHS {paymentPayload.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row no-print">
              <div class="col-12">
                <button
                  style={{ "margin-right": "5px;" }}
                  type="button"
                  class="btn btn-success float-right"
                  onClick={() => {
                    onClickConfirmPayment();
                  }}
                >
                  <i class="far fa-credit-card"></i> Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
