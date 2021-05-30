const mysql = require("mysql");
const logger = require("./logger.js");
var {
  APP_DB_HOST,
  APP_DB_USER,
  APP_DB_PASSWORD,
  APP_DB_DATABASE,
} = require("./config");

const connection = mysql.createConnection({
  host: APP_DB_HOST,
  user: APP_DB_USER,
  password: APP_DB_PASSWORD,
  database: APP_DB_DATABASE,
});

connection.connect(function (error) {
  if (!!error) {
    logger.log('error', error);
  } else {
    logger.log('info',"Connected..!");
  }
});

module.exports = connection;
