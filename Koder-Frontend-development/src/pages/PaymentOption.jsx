import React from "react";
export default function ChoosePayment({
  fees,
  paymentPayload,
  setPaymentPayload,
  setIsFeeItemNotSelected,
  setIsCard,
  isFeeItemNotSelected,
  feeId,
  setAppState
}) {
  return (
    <div class="content-wrapper" style={{ "min-height": "1416.81px;" }}>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Student Payable Fees</h1>
            </div>
          </div>
        </div>
      </section>
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="invoice p-3 mb-3">
                <div class="row">
                  <div class="col-12">
                    <h4>
                      <i class="fas fa-globe"></i>Koder International School:
                      Student Fee Information
                      <small class="float-right">
                        Date: {Date().toLocaleString()}
                      </small>
                    </h4>
                  </div>
                </div>
                <div class="row invoice-info">
                  <div class="col-sm-12 invoice-col">
                    <address>
                      Payment is being made for{" "}
                      <strong>{`${fees.fee_details[0].first_name} ${fees.fee_details[0].middle_name} ${fees.fee_details[0].surname}`}</strong>
                      <br />
                      Registration #
                      <strong>{fees.fee_details[0].registration_number}</strong>
                      <br />
                      Class <strong>{fees.fee_details[0].class}</strong>
                      <br />
                      Term <strong>{fees.fee_details[0].semester}</strong>
                      <br />
                      Program Started{" "}
                      <strong>{fees.fee_details[0].program_start_date}</strong>
                      <br />
                      Program Ends{" "}
                      <strong>{fees.fee_details[0].program_end_date}</strong>
                      <br />
                    </address>
                  </div>
                </div>

                {isFeeItemNotSelected ? (
                  <label
                    class="col-form-label is-invalid"
                    for="inputError"
                    style={{ color: "red" }}
                  >
                    <i class="far fa-times-circle "></i> No Fee item selected
                  </label>
                ) : (
                  ""
                )}
                <div class="row">
                  <div class="col-12 table-responsive">
                    <table class="table table-striped is-invalid">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Fee Item</th>
                          <th>Description</th>
                          <th>Subtotal (GHS)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees.fee_details.map((fee) => (
                          <tr>
                            <td>
                              <div class="form-group">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="feeId"
                                    value={feeId}
                                    onChange={() => {
                                      setPaymentPayload((prev) => ({
                                        ...prev,
                                        fee_id: fees.fee_details[0].id,
                                        merchant_id: 1,
                                        amount: fees.fee_details[0].amount,
                                        ccy: "GHS",
                                      }));
                                    }}
                                  />
                                  <label class="form-check-label"></label>
                                </div>
                              </div>
                            </td>
                            <td>{fee.type}</td>
                            <td>{fee.description}</td>
                            <td>{fee.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6">
                    <p class="lead">Select Payment Method:</p>
                    <img
                      src={`/images/mastercard.png`}
                      alt="mastercard"
                      onClick={() => {
                   
                        if (paymentPayload.amount === undefined) {
                          {
                            setIsFeeItemNotSelected(true);
                          }
                        } else {
                            console.log(paymentPayload)
                          setPaymentPayload((prev) => ({
                            ...prev,
                            is_card: 1,
                            merchant_card_terminal_id: 1,
                          }));
                          setAppState("CHECKOUT");
                          setIsCard(true);
                        }
                      }}
                      id="mastercard"
                    />
                    <img
                      src={`/images/visacard.png`}
                      alt="visacard"
                      onClick={() => {
                        if (paymentPayload.amount === undefined) {
                          {
                            setIsFeeItemNotSelected(true);
                          }
                        } else {
                          setPaymentPayload((prev) => ({
                            ...prev,
                            is_card: 1,
                            merchant_card_terminal_id: 2,
                          }));
                          setIsCard(true);
                          setAppState("CHECKOUT");
                        }
                      }}
                      id="visacard"
                    />
                    <img
                      src={`/images/mtn.png`}
                      alt="mtn"
                      onClick={() => {
                        if (paymentPayload.amount === undefined) {
                          {
                            setIsFeeItemNotSelected(true);
                          }
                        } else {
                          setPaymentPayload((prev) => ({
                            ...prev,
                            is_card: 0,
                            merchant_wallet_terminal_id: 1,
                          }));
                          setAppState("CHECKOUT");
                        }
                      }}
                      id="mtn"
                    />

                    <p
                      class="text-muted well well-sm shadow-none"
                      style={{ "margin-top": "10px;" }}
                    >
                      Please select the fee item you want to pay and click on
                      the payment method
                    </p>
                  </div>

                  <div class="col-6">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                          <tr>
                            <th>Total:</th>
                            <td>
                              {fees.fee_details.reduce((init, fee_detail) => {
                                return init + fee_detail.amount;
                              }, 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
