import React, { useState, useEffect, Form } from "react";
import BackEndService from "../services/BackEndService";
import img1 from "../assets/img/user1-128x128.jpg";
import { encrypt, decrypt } from "../utils/crypto";
import ToastMessage from "../compoents/ToastMessageMessage";

export default function ConfirmRefund({
  transactions,
  setIsProcessing,
  setIsProcessed,
  refund,
  setRefund,
  setRefundPayload,
  refundPayload, 

}) {

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [reason, setReason] = useState("");

  const onChangeReason = (e) => {
    const value = e.target.value;
    setReason(value);
    setRefundPayload((prev) => ({
      ...prev,
      reason: value,
    }));
  };

  const onChangeAction = (e) => {
    const action = e.target.id.value;
    console.log(action);
  };

  const onClickConfirmRefund = () => {
    console.log(refundPayload);
    setIsProcessing(true);
    BackEndService.refundTransaction(refundPayload)
      .then((ref) => {
        console.log(refundPayload);
        setIsProcessing(false);
        setIsProcessed(true);
        setRefund(JSON.parse(decrypt(ref.data)));
        console.log(refund);
        console.log(decrypt(ref.data));
      })
      .catch((error) => {
        setIsProcessing(false);
        setIsProcessed(true);
        setRefund(JSON.parse(decrypt(error.response.data)))
        //setIsValidationError(true)
        //setIsError(false);
        //setError(JSON.parse(decrypt(error.response.data)).message);
      });
  };
  return (
    <div class="content-wrapper" style={{ "min-height": "1416.81px;" }}>
         <div class="row">
          {isError && <ToastMessage message={error} />}
          <div class="col-md-3 "></div>
          <div class="col-md-6 ">
            <div class="card ">
              <div class="alert alert-info alert-dismissible">
                <h5>
                  <i class="icon fas fa-ban"></i> Transaction Refund
                  Confirmation
                </h5>
              </div>

              <div class="row">
                <div class="col-6">
                  <p class="lead">Payment Scheme:</p>
                  {transactions.transaction_details[0].is_card === 1 ? (
                    transactions.transaction_details[0].is_card == 1 ? (
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
                      {transactions.transaction_details[0].is_card
                        ? transactions.transaction_details[0].payer_card_no
                        : transactions.transaction_details[0].payer_wallet_no}
                    </strong>
                  </p>
                </div>
                <div class="col-6">
                  <address>
                    Please confim the refund of the Transaction with details
                    below
                    <br />
                    <br />
                    Payment Reference #{" "}
                    <strong>
                      {
                        transactions.transaction_details[0]
                          .transaction_reference
                      }
                    </strong>
                    <br />
                    Payment Method{" "}
                    <strong>
                      {transactions.transaction_details[0].is_card
                        ? "CARD"
                        : "WALLET"}
                    </strong>
                    <br />
                    Transaction Date{" "}
                    <strong>
                      {transactions.transaction_details[0].transaction_date}
                    </strong>
                    <br />
                  </address>
                </div>

                <div class="col-12 col-sm-4">
                  <div class="info-box bg-light">
                    <div class="info-box-content">
                      <span class="info-box-text text-center text-muted">
                        Total Amount
                      </span>
                      <span class="info-box-number text-center mb-0 lead">
                        {transactions.transaction_details[0].amount}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label>Reason for Refund</label>
                    <textarea
                      value={reason}
                      onChange={onChangeReason}
                      class="form-control"
                      rows="3"
                      placeholder="Enter ..."
                    ></textarea>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-group">
                    <button
                      type="button"
                      class="btn btn-danger float-right"
                      onClick={onClickConfirmRefund}
                    >
                      <i class="far fa-credit-card"></i> Confirm Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
