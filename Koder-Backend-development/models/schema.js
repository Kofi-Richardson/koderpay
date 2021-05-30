const Joi = require("joi");
validateRegistrationNumber = (registration_number) => {
  const schema = Joi.string()
    .alphanum()
    .min(6)
    .max(20)
    .label("registration_number");
  return schema.validate(registration_number);
};
validatePayerID = (payerId) => {
  const schema = Joi.number()
    .integer()
    .required()
    .min(1)
    .max(1000000000)
    .label("payer_id");
  return schema.validate(payerId);
};

validateTransactionPayload = (transaction) => {
  const schema = Joi.object({
    fee_id: Joi.number().integer().min(1).label("fee_id").required(),
    is_card: Joi.number().integer().label("is_card").max(1).required(),
    merchant_id: Joi.number().integer().min(1).label("merchant_id").required(),
    merchant_card_terminal_id: Joi.number()
      .integer()
      .min(1)
      .label("merchant_card_terminal_id"),
    merchant_wallet_terminal_id: Joi.number()
      .integer()
      .min(1)
      .label("merchant_wallet_terminal_id"),
    paid_by: Joi.number().integer().min(1).label("paid_by").required(),
    payer_wallet_no: Joi.string()
      .alphanum()
      .min(6)
      .max(20)
      .label("payer_wallet_no"),
    payer_wallet_telco: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .label("payer_wallet_telco"),
    payer_card_no: Joi.string().min(16).max(16).label("payer_card_no"),
    payer_name_on_card: Joi.string().min(3).max(100),
    payer_card_expiry: Joi.string()
      .min(5)
      .max(5)
      .pattern(new RegExp('(?:0[1-9]|1[0-2])/[0-9]{2}'))
      .label("payer_card_expiry"),
    payer_cvv: Joi.string().min(3).max(3).label("payer_cvv"),
    amount: Joi.number().positive().label("amount").required(),
    ccy: Joi.string().min(3).max(3).label("ccy").required(),
  })
    .xor("merchant_card_terminal_id", "merchant_wallet_terminal_id")
    .with("merchant_card_terminal_id", [
      "payer_card_no",
      "payer_name_on_card",
      "payer_card_expiry",
      "payer_cvv",
    ])
    .with("merchant_wallet_terminal_id", [
      "payer_wallet_no",
      "payer_wallet_telco",
    ]);
  return schema.validate(transaction);
};

validateRefundPayload = (refund) => {
  const schema = Joi.object({
    transaction_payment_id: Joi.number()
      .integer()
      .min(1)
      .label("transaction_payment_id")
      .required(),
    reason: Joi.string().min(15).label("reason").required(),
  });

  return schema.validate(refund);
};

validateLoginPayload = (login) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  return schema.validate(login);
};

validateRegisterUserPayload = (user) => {
  const schema = Joi.object({
    surname: Joi.string().alphanum().min(3).max(30).required(),
    middle_name: Joi.string().alphanum().min(3).max(30).required(),
    first_name: Joi.string().alphanum().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    phone: Joi.string().alphanum().min(8).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    user_type_id: Joi.number().integer().min(1).required(),
    address: Joi.object({
      line_1: Joi.string().min(10).required(),
      line_2: Joi.string().min(10),
      city: Joi.string().min(3),
      postcode: Joi.string().min(3),
      state: Joi.string().min(3),
      country: Joi.string().min(3),
    }).required(),
    student_details: Joi.object({
      registration_number: Joi.string()
      .alphanum()
      .min(6)
      .max(20).required(),
      class: Joi.string().min(3).required(),
      semester: Joi.string().min(1).required(),
      program_start_date: Joi.date().required(),
      program_end_date: Joi.date().required(),
      department_id: Joi.number().integer().min(1).required(),
      status: Joi.string().min(4).required(),
    }),
  });

  return schema.validate(user);
};

module.exports = {
  validateRegistrationNumber,
  validatePayerID,
  validateTransactionPayload,
  validateRefundPayload,
  validateLoginPayload,
  validateRegisterUserPayload
};