const { reject } = require("q");
const connection = require("../../connection.js");
const logger = require("../../logger.js");

isFeeStatusUpdated = ({ status, id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE student_fees_due SET fees_status='${status}' WHERE id=${id}`,
      (err, result) => {
        logger.log('info',err);
        if (err) {
          return reject(new Error(err.message));
        }
        return resolve(result);
      }
    );
  
  });
};

updatePayment = ({
  transaction_status,
  processor_payment_reference,
  processor_status_code,
  processor_status_message,
  id,
}) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE student_fees_payments SET transaction_status='${transaction_status}', processor_payment_reference='${processor_payment_reference}',processor_status_code='${processor_status_code}',processor_status_message='${processor_status_message}' WHERE id=${id}`,
      (err, result) => {
        logger.log('info',err);
        if (err) {
          return reject(new Error(err.message));
        }
        logger.log('info',result);
        return resolve(result);
      }
    );
  
  });
};

getMerchantWalletTerminalInfo = ({ merchant_id, terminal_id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT merchant_wallet_terminals.id, merchant_wallet_terminals.account, merchant_wallet_terminals.ccy, financial_institutions.name, financial_institution_categories.category, payment_schemes.scheme, merchant_wallet_terminals.username, merchant_wallet_terminals.password, merchant_info.id, merchant_info.first_name,merchant_info.middle_name, merchant_info.last_name, merchant_info.date_of_birth, merchant_info.email, merchant_info.nationality, merchant_info.mobile_no, mcc, merchant_info.business_type, merchant_info.registration_code, merchant_info.merchant_name, merchant_addresses.line_1, merchant_addresses.line_2, merchant_addresses.city, merchant_addresses.postcode, merchant_addresses.state, merchant_addresses.country, merchant_info.status, merchant_wallet_terminals.terminal_number, merchant_wallet_terminals.msisdn, merchant_wallet_terminals.telco FROM merchant_wallet_terminals INNER JOIN financial_institutions ON merchant_wallet_terminals.financial_inst_id=financial_institutions.id INNER JOIN financial_institution_categories ON financial_institutions.category_id=financial_institution_categories.id INNER JOIN payment_schemes ON merchant_wallet_terminals.scheme_id=payment_schemes.id INNER JOIN merchant_info on merchant_wallet_terminals.merchant_id=merchant_info.id INNER JOIN merchant_addresses ON merchant_info.address_id=merchant_addresses.id WHERE merchant_wallet_terminals.id=${terminal_id} AND merchant_info.id=${merchant_id}`,
      (err, result) => {
        logger.log('info',err)
        logger.log('info',result)
        if (err) {
          return reject(new Error(err));
        }
        return resolve(result[0]);
        
      }
    );
  
  });
};
getMerchantCardTerminalInfo = ({ merchant_id, terminal_id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT merchant_card_terminals.id, merchant_card_terminals.account, merchant_card_terminals.ccy, financial_institutions.name, financial_institution_categories.category, payment_schemes.scheme, merchant_card_terminals.username, merchant_card_terminals.password, merchant_info.id, merchant_info.first_name,merchant_info.middle_name, merchant_info.last_name, merchant_info.date_of_birth, merchant_info.email, merchant_info.nationality, merchant_info.mobile_no, mcc, merchant_info.business_type, merchant_info.registration_code, merchant_info.merchant_name, merchant_addresses.line_1, merchant_addresses.line_2, merchant_addresses.city, merchant_addresses.postcode, merchant_addresses.state, merchant_addresses.country, merchant_info.status, merchant_card_terminals.terminal_number, merchant_card_terminals.card_number, merchant_card_terminals.fullname, merchant_card_terminals.mm_yy, merchant_card_terminals.cvv FROM merchant_card_terminals INNER JOIN financial_institutions ON merchant_card_terminals.financial_inst_id=financial_institutions.id INNER JOIN financial_institution_categories ON financial_institutions.category_id=financial_institution_categories.id INNER JOIN payment_schemes ON merchant_card_terminals.scheme_id=payment_schemes.id INNER JOIN merchant_info on merchant_card_terminals.merchant_id=merchant_info.id INNER JOIN merchant_addresses ON merchant_info.address_id=merchant_addresses.id WHERE merchant_card_terminals.id=${terminal_id} AND merchant_info.id=${merchant_id}`,
      (err, result) => {
        if (err) {
          logger.log('info',result)
          return reject(new Error(err.message));
        }
        return resolve(result[0]);
      }
    );
  
  });
};

getPayerDetails = ({ user_id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT surname, middle_name, first_name, username, password, phone, email, user_addresses.line_1, user_addresses.line_2, user_addresses.city,user_addresses.postcode, user_addresses.state, user_addresses.country FROM users INNER JOIN user_addresses ON users.user_address_id=user_addresses.id WHERE users.id=${user_id}`,
      (err, result) => {
        if (err) {
          logger.log('info',err)
          return reject(new Error(err.message));
        }
        return resolve(result[0]);
      }
    );
  
  });
};

isTransactionRecorded = (values) => {
  console.log(values)
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO student_fees_payments(transaction_reference, fee_id, is_card, merchant_id, merchant_card_terminal_id, merchant_wallet_terminal_id, paid_by, payer_wallet_no, payer_wallet_telco, payer_card_no, payer_name_on_card, payer_card_expiry, amount, ccy) VALUES ?;`,
      [values],
      (err, result) => {
        if (err) {
          return reject(new Error(err.message));
        }
        return resolve(result.insertId);
      }
    );
  
  });
};

isTransactionUpdated = ({ refunded, id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE student_fees_payments SET refunded='${refunded}' WHERE id=${id}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err.message));
        }
        return resolve(result);
      }
    );
  
  });
};
isFeeStatusUpdated = ({ status, id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE student_fees_due SET fees_status='${status}' WHERE id=${id}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err.message));
        }
        return resolve(result);
      }
    );
  
  });
};

fetchFeeDueId = ({ paymentId }) => {
  logger.log('info',"paymentId".paymentId);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT fee_id from student_fees_payments WHERE id=${paymentId}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err.message));
        }
        return resolve(result[0].fee_id);
      }
    );
  
  });
};

fetchTransactionByPaymentID = ({ payment_id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT  student_fees_payments.fee_id,student_fees_payments.is_card, student_fees_payments.transaction_reference, student_fees_payments.transaction_status, student_fees_payments.ccy, student_fees_payments.merchant_id, student_fees_payments.merchant_card_terminal_id, student_fees_payments.merchant_wallet_terminal_id, student_fees_payments.paid_by, student_fees_payments.payer_wallet_no, student_fees_payments.payer_wallet_telco, student_fees_payments.payer_card_no, student_fees_payments.payer_name_on_card, student_fees_payments.payer_card_expiry, student_fees_payments.processor_payment_reference, student_fees_payments.processor_status_code, student_fees_payments.processor_status_message, student_fees_payments.amount, student_fees_payments.comment, student_fees_payments.refunded FROM student_fees_payments  WHERE   student_fees_payments.id=${payment_id}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err.message));
        }
       logger.log('info',result)
        return resolve(result[0]);
      }
    );
  
  });
};

saveRefundRequest = (values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO student_fees_refunds(transaction_payment_id, reason) VALUES ?`,
      [values],
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result.insertId);
      }
    );
  
  });
};
/*
getPayerDetails = ({ payerId }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT  student_fees_payments.fee_id, student_fees_payments.transaction_reference, student_fees_payments.transaction_status, student_fees_payments.merchant_id, student_fees_payments.merchant_card_terminal_id, student_fees_payments.merchant_wallet_terminal_id, student_fees_payments.paid_by, student_fees_payments.payer_wallet_no, student_fees_payments.payer_wallet_telco, student_fees_payments.payer_card_no, student_fees_payments.payer_name_on_card, student_fees_payments.payer_card_expiry, student_fees_payments.processor_payment_reference, student_fees_payments.processor_status_code, student_fees_payments.processor_status_message, student_fees_payments.amount, student_fees_payments.comment, student_fees_payments.refunded, student_fees_payments.transaction_date as refund_transaction_date, student_fees_refunds.transaction_payment_id as refund_transaction_payment_id, student_fees_refunds.currency as refund_currency, student_fees_refunds.reason as refund_reason, student_fees_refunds.processor_payment_reference as refund_processor_payment_reference, student_fees_refunds.processor_status_code as refund_processor_status_code, student_fees_refunds.processor_status_message as refund_processor_status_message, student_fees_refunds.transaction_status as refund_transaction_status_id, student_fees_refunds.amount as refunded_amount, student_fees_refunds.transaction_date as refund_date FROM student_fees_payments LEFT JOIN student_fees_refunds ON student_fees_refunds.transaction_payment_id=student_fees_payments.id INNER JOIN users ON users.id=student_fees_payments.paid_by=${payerId}`,
      (err, result) => {
        logger.log('info',err);
        if (err) {
          return reject({
            success: false,
            message: "There was an error in fetching transaction",
            status_code: 1308,
            data: {},
          });
        }
        return resolve({
          success: true,
          status_code: 1308,
          message: "Transaction fetched successfully",
          data: { result },
        });
      }
    );
  });
};
*/



fetchTransactionStatusByPaymentID = ({ payment_id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT transaction_status from student_fees_payments WHERE id=${payment_id}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err.message));
        }
        return resolve(result[0].transaction_status);
      }
    );
  
  });
};

fetchFessByRegNo = ({ registration_number }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.surname, users.middle_name, users.first_name, students.registration_number, students.class, students.semester,     students.program_start_date, students.program_end_date, student_fees_due.fees_status, fees_types.type, fees_types.description, student_fees_due.id, student_fees_due.amount,student_fees_due.due_date, student_fees_due.comment  FROM student_fees_due INNER JOIN students ON student_fees_due.student_id=students.user_id INNER JOIN users ON student_fees_due.student_id=users.id  INNER JOIN  fees_types ON student_fees_due.fees_id=fees_types.id WHERE registration_number='${registration_number}' AND fees_status<>'PAID'`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err.message));
        }
        return resolve(result);
      }
    );
  
  });
};

fetchTransactionsByPayer = ({ payer_id }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT student_fees_payments.id,students.registration_number, students.class, students.semester,student_user.surname, student_user.middle_name, student_user.first_name,  student_fees_due.amount, fees_types.type, fees_types.description, student_fees_payments.fee_id, student_fees_payments.transaction_date, student_fees_payments.ccy, student_fees_payments.is_card, student_fees_payments.transaction_reference, student_fees_payments.transaction_status, student_fees_payments.merchant_id, student_fees_payments.merchant_card_terminal_id, student_fees_payments.merchant_wallet_terminal_id, student_fees_payments.paid_by, student_fees_payments.payer_wallet_no, student_fees_payments.payer_wallet_telco, student_fees_payments.payer_card_no, student_fees_payments.payer_name_on_card, student_fees_payments.payer_card_expiry, student_fees_payments.processor_payment_reference, student_fees_payments.processor_status_code, student_fees_payments.processor_status_message, student_fees_payments.amount, student_fees_payments.comment, student_fees_payments.refunded, student_fees_payments.transaction_date as refund_transaction_date, student_fees_refunds.transaction_payment_id as refund_transaction_payment_id, student_fees_refunds.reason as refund_reason, student_fees_refunds.processor_payment_reference as refund_processor_payment_reference, student_fees_refunds.processor_status_code as refund_processor_status_code, student_fees_refunds.processor_status_message as refund_processor_status_message, student_fees_refunds.transaction_status as refund_transaction_status, student_fees_refunds.transaction_date as refund_date FROM student_fees_payments LEFT JOIN student_fees_refunds ON student_fees_refunds.transaction_payment_id=student_fees_payments.id INNER JOIN student_fees_due ON student_fees_payments.fee_id=student_fees_due.id  INNER JOIN fees_types ON student_fees_due.fees_id=fees_types.id INNER JOIN students ON student_fees_due.student_id=students.user_id INNER JOIN users as student_user on students.user_id=student_user.id INNER JOIN users ON users.id=student_fees_payments.paid_by=${payer_id}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result);
      }
    );
  
  });
};

saveStudent = (values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO students SET ?`,
      values,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result.insertId);
      }
    );
  
  });
};

saveGeneralPublicInfo = (values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO general_public SET ?`,
      values,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result.insertId);
      }
    );
  
  });
};
saveAddressInfo = (values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO user_addresses SET ?`,
      values,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result.insertId);
      }
    );
  
  });
};

createUser = (values) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO users SET ?`,
      values,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result.insertId);
      }
    );
  
  });
};

fetchStudentInfo = ({ userId }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_id, user_type_id, registration_number, class, semester, program_start_date, program_end_date, department_id, status_id FROM students WHERE user_id=${userId}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result[0]);
      }
    );
  
  });
};

fetchGeneralPublicInfo= ({ userId }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT user_id, user_type_id FROM general_public WHERE user_id=${userId}`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result[0]);
      }
    );
  
  });
};

fetchUserByUserName= ({ username }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, surname, middle_name, first_name, username, password, phone, email, user_type_id FROM users WHERE username='${username}'`,
      (err, result) => {
        if (err) {
          logger.log('info',err);
          return reject(new Error(err));
        }
        return resolve(result[0]);
      }
    );
  
  });
};


module.exports = {
  updatePayment,
  getMerchantWalletTerminalInfo,
  getMerchantCardTerminalInfo,
  getPayerDetails,
  isTransactionRecorded,
  saveRefundRequest,
  fetchFeeDueId,
  isFeeStatusUpdated,
  isTransactionUpdated,
  fetchTransactionByPaymentID,
  fetchFessByRegNo,
  fetchTransactionsByPayer,
  saveStudent,
  saveGeneralPublicInfo,
  saveAddressInfo,
  createUser,
  fetchStudentInfo,
  fetchGeneralPublicInfo,
  fetchUserByUserName,
  fetchGeneralPublicInfo,
  fetchTransactionStatusByPaymentID
};