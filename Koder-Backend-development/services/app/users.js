const { validateRegisterUserPayload } = require("../../models/schema");
const connection = require("../../connection.js");
const crud = require("../db/crud.js");
const bcrypt = require("bcrypt");
const crypto = require("../../utilities/crypto");
const querystring = require("querystring");
const logger = require("../../logger.js");
var {
  APP_HEADERS,
} = require("../../config");
async function userRegister(body, res) {
  const validateRegisterUserPayloadResp = validateRegisterUserPayload(body);
  logger.log('info',validateRegisterUserPayloadResp);
  if (validateRegisterUserPayloadResp.error) {
    res.writeHead(400,APP_HEADERS);
    res.write(
      crypto.encrypt({
        success: false,
        status_code: "VV099",
        message: JSON.parse(
          JSON.stringify(validateRegisterUserPayloadResp.error.message)
        ),
        fee_details: {},
      })
    );
    res.end();
  }
  else {
    const saltRounds = 10;
    const userTypeId = body.user_type_id;
    const password = body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    crud
      .saveAddressInfo(body.address)
      .then((addressId) => {
        const values = {
          surname: body.surname,
          middle_name: body.middle_name,
          first_name: body.first_name,
          username: body.username,
          password: encryptedPassword,
          phone: body.phone,
          email: body.email,
          user_type_id: body.user_type_id,
          user_address_id: addressId,
        };
        crud
          .createUser(values)
          .then((resultId) => {
            if (userTypeId == 1) {
              const student_details = body.student_details;
              student_details.user_id = resultId;
              student_details.user_type_id = userTypeId;
              logger.log('info',student_details);
              crud.saveStudent(student_details).then(() => {
                res.writeHead(200, APP_HEADERS);
                res.write(
                  crypto.encrypt({
                    success: true,
                    status_code: "RE000",
                    message: "User Registered Successfully",
                    data: { id: resultId, student_details: body },
                  })
                );
                res.end();
              });
            } else {
              crud
                .saveGeneralPublicInfo({
                  user_type_id: userTypeId,
                  user_id: resultId,
                })
                .then(() => {
                  res.writeHead(200, APP_HEADERS);
                  res.write(
                    crypto.encrypt({
                      success: true,
                      status_code: "RE000",
                      message: "User Registered Successfully",
                      data: { id: resultId },
                    })
                  );
                  res.end();
                });
            }
          })
          .catch((error) => {
            logger.log('info',error);
            res.writeHead(500, APP_HEADERS);
            res.write(
              crypto.encrypt({
                success: false,
                status_code: "GE099",
                message: "User Registration Failed",
                data: {},
              })
            );
            res.end();
          });
      })
      .catch(() => {
        res.writeHead(500, APP_HEADERS);
        res.write(
          crypto.encrypt({
            success: false,
            status_code: "GE099",
            message: "User Registration Failed",
            data: {},
          })
        );
        res.end();
      });
  }

}
module.exports = { userRegister };
