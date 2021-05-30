const { validateLoginPayload } = require("../../models/schema");
const connection = require("../../connection.js");
const crud = require("../db/crud.js");
const bcrypt = require("bcrypt");
const crypto = require("../../utilities/crypto");
const querystring = require("querystring");
var { APP_HEADERS } = require("../../config");
const logger = require("../../logger.js");
//cryptography.decryptRequest,
function userLogin(body, res) {
  const saltRounds = 10;
  const username = body.username;
  const password = body.password;

  //const encryptedPassword = await bcrypt.hash(password, saltRounds)
  // const values = [[]];
  const validateLoginPayloadResponse = validateLoginPayload(body);
  logger.log('info',validateLoginPayloadResponse);
  
  if (validateLoginPayloadResponse.error) {
    res.writeHead(400, APP_HEADERS);
    res.write(
      crypto.encrypt({
        success: false,
        status_code: "VV099",
        message: JSON.parse(
          JSON.stringify(validateLoginPayloadResponse.error.message)
        ),
        fee_details: {},
      })
    );
    res.end();
    return;
  }
 


  else { 
   
    
    crud
      .fetchUserByUserName({ username })
      .then(async (result) => {
        logger.log('info',result);
        if (result) {
          const comparision = await bcrypt.compare(password, result.password);
          if (comparision) {
            const userId = result.id;
            logger.log('info',"userId: ".userId);
            const userTypeId = result.user_type_id;
            //Check user type here
            if (userTypeId == 1) {
              crud.fetchStudentInfo({ userId }).then((student) => {
                result.studentDetails = student;
              });
            } else {
              crud.fetchGeneralPublicInfo({ userId }).then((gp) => {
                result.generalPublic = gp;
              });
            }
              res.writeHead(200,APP_HEADERS);
              res.write(
                crypto.encrypt({
                  success: true,
                  status_code: "L0000",
                  message: "User Login Successful",
                  data: { id: result.id, user_details: result },
                })
              );
              res.end();
              return;
            
          } else {
            res.writeHead(400, APP_HEADERS);
            res.write(
              crypto.encrypt({
                success: false,
                status_code: "-L0000",
                message: "Username or password is wrong",
                data: {},
              })
            );
            res.end();
            return;
          }
        } else {
          res.writeHead(400,APP_HEADERS);
          res.write(
            crypto.encrypt({
              success: false,
              status_code: "-L0000",
              message: "Username or password is wrong",
              data: {},
            })
          );
          res.end();
          return;
        }
      })
      .catch((e) => {
        logger.log('info',e);
        res.writeHead(400, APP_HEADERS);
        res.write(
          crypto.encrypt({
            success: false,
            status_code: "GE099",
            message: "There was an error in Login attempt",
            data: {},
          })
        );
        res.end();
        return;
      });
      
 }
}

module.exports = { userLogin };
