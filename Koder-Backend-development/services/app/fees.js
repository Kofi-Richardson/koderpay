const { validateRegistrationNumber } = require("../../models/schema");
const connection = require("../../connection.js");
const logger = require("../../logger.js");
var {
  APP_HEADERS,
} = require("../../config");
const crud = require("../db/crud.js");
const crypto = require("../../utilities/crypto");
const querystring = require("querystring");

function getFeesByRegistrationID({ registration_number }, res) {
  logger.log('info',registration_number);
  const validationResponse = validateRegistrationNumber(registration_number);
  if (validationResponse.error) {
    res.writeHead(400, APP_HEADERS);
    res.write(
      crypto.encrypt({
        success: false,
        status_code: "VV099",
        message: JSON.parse(JSON.stringify(validationResponse.error.message)),
        fee_details: {},
      })
    );
    res.end();
    return;
  } 
  
  else {
    crud
      .fetchFessByRegNo({ registration_number: registration_number })
      .then((fees) => {
        logger.log('info',fees.length)
        if (!fees||fees.length===0) {
          res.writeHead(404, APP_HEADERS);
          res.write(
            crypto.encrypt({
              success: false,
              status_code: "-FF000",
              message: "No pending fees found for the registration number",
              fee_details: fees,
            })
          );
          res.end();
          return;
        } else {
          res.writeHead(200, APP_HEADERS);
          res.write(
            crypto.encrypt({
              success: true,
              status_code: "FF000",
              message: "Student fees fetched successfully",
              fee_details: fees,
            })
          );
          res.end();
          return;
        }
      })
      .catch((error) => {
        res.writeHead(400, APP_HEADERS);
        res.write(
          crypto.encrypt({
            success: false,
            message: "There was an error in fetching student fees",
            status_code: "GE099",
            fee_details: {},
          })
        );
        res.end();
        return;
      });
  }
}
module.exports = { getFeesByRegistrationID };
