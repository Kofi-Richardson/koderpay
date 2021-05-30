import React, {useState} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
export default function Checkout({
  isCard,
  setPaymentPayload,
  setAppState
}) {
  const handleCheckout = (values, errors) => {
    setPaymentPayload((prev) => ({
      ...prev,
      paid_by: 1,
      payer_card_no: values.cardNumber,
      payer_name_on_card: values.nameOnCard,
      payer_card_expiry: values.mm_yy,
      payer_cvv: values.cvv,
    }));

    setAppState("CONFIRM")
  };
  const validateCheckoutSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .label("Card Number")
      .min(16, "Card number should be 16 digits")
      .max(16, "Card number should be 16 digits")
      .required(),
    nameOnCard:  Yup.string().label("Name on Card").required().min(3),
    mm_yy: Yup.string().label("Expiry Date").min(5).max(5).required().matches("(?:0[1-9]|1[0-2])/[0-9]{2}"),
    cvv: Yup.string().label("CVC").min(3).max(3).required(),
  });

    
  const [cardNumber, setCardNumber] = useState("");

  const onChangeCardNumber = (e) => {
    const value = e.target.value;
    setCardNumber(value);
  };

  const [nameOnCard, setNameOnCard] = useState("");
  const onChangeNameOnCard = (e) => {
    const value = e.target.value;
    setNameOnCard(value);
  };

  const [mm_yy, setMm_yy] = useState("");
  const onChangeMm_yy = (e) => {
    const value = e.target.value;
    setMm_yy(value);
  };

  const [cvv, setCvv] = useState("");
  const onChangeCvv = (e) => {
    const value = e.target.value;
    setCvv(value);
  };

  const [walletNumber, setWalletNumber] = useState("");
  const onChangeWalletNumber = (e) => {
    const value = e.target.value;
    setWalletNumber(value);
  };

  const [telco, setTelco] = useState("");
  const onTelcoChange = (e) => {
    const value = e.target.value;
    setTelco(value);
  };

  return isCard ? (
    <body class="hold-transition login-page">
      <div class="login-box">
        <div class="login-logo">
          <a href="../../index2.html"></a>
        </div>

        <div class="login-logo"></div>
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">MasterCard/Visa Card Detail</h3>
          </div>

          <Formik
            initialValues={{
              cardNumber: "",
              nameOnCard: "",
              mm_yy: "",
              cvv,
            }}
            onSubmit={(values, errors) => {
              handleCheckout(values, errors);
            }}
            validationSchema={validateCheckoutSchema}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => {
              return (
                <form class="form-horizontal" onSubmit={handleSubmit}>
                  <div class="card-body">
                    <div class="form-group row">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fas fa-credit-card"></i>
                          </span>
                        </div>

                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.cardNumber ? "is-invalid" : ""
                          }`}
                          value={values.cardNumber}
                          placeholder="Enter Card Number"
                          onChange={handleChange("cardNumber")}
                        />

                        {touched.cardNumber && errors.cardNumber ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.cardNumber}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fas fa-address-card"></i>
                          </span>
                        </div>

                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.nameOnCard ? "is-invalid" : ""
                          }`}
                          value={values.nameOnCard}
                          placeholder="Enter Name on Card"
                          onChange={handleChange("nameOnCard")}
                        />

                        {touched.nameOnCard && errors.nameOnCard ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i>{" "}
                            {errors.nameOnCard}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div class="form-group row">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fas fa-calendar"></i>
                          </span>
                        </div>

                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.mm_yy ? "is-invalid" : ""
                          }`}
                          value={values.mm_yy}
                          placeholder="MM/YY"
                          onChange={handleChange("mm_yy")}
                        />

                        {touched.mm_yy && errors.mm_yy ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.mm_yy}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="fas fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          name="id"
                          class={`form-control ${
                            errors.cvv ? "is-invalid" : ""
                          }`}
                          value={values.cvv}
                          placeholder="CVV"
                          onChange={handleChange("cvv")}
                        />

                        {touched.cvv && errors.cvv ? (
                          <label class="col-form-label" for="inputError">
                            <i class="far fa-times-circle"></i> {errors.cvv}
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button type="submit" class="btn btn-success float-right">
                      <i class="far fa-credit-card"></i> Submit Payment
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </body>
  ) : (
    <body class="hold-transition login-page">
      <div class="login-box">
        <div class="login-logo">
          <a href="../../index2.html"></a>
        </div>

        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">MTN Mobile Money Wallet Details</h3>
          </div>

          <form class="form-horizontal">
            <div class="card-body">
              <div class="form-group row">
                <label for="exampleInputEmail1">Mobile Number</label>
                <input
                  name="mobile_number"
                  value={walletNumber}
                  onChange={onChangeWalletNumber}
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Card Number"
                />
              </div>
              <div class="form-group row">
                <label for="exampleInputEmail1">Mobile Number</label>
                <input
                  name="mobile_number"
                  value={telco}
                  onChange={onTelcoChange}
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Card Number"
                />
              </div>
            </div>
            <div class="card-footer">
              <button
                type="button"
                class="btn btn-success float-right"
                onClick={() => {
               
                  setPaymentPayload((prev) => ({
                    ...prev,
                    paid_by: 1,
                    payer_wallet_no: walletNumber,
                    payer_wallet_telco: "MTN",
                  }));
                  setAppState("CONFIRM")
                }}
              >
                <i class="far fa-credit-card"></i> Submit Payment
              </button>
              <button
                type="button"
                class="btn btn-primary float-right"
                style={{ "margin-right": "5px;" }}
              >
                <i class="fas fa-download"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}