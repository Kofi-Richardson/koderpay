const https = require("https");
const fs = require("fs");
const url = require("url");
const fees = require("./services/app/fees");
const login = require("./services/app/login");
const register = require("./services/app/users");
const transactions = require("./services/app/transactions");
const refunds = require("./services/app/refunds");
const qs = require("querystring");
const Provider = require("oidc-provider");
const cors = require("cors");
const crypto = require("./utilities/crypto");
const querystring = require("querystring");
const authorization = require("./middleware/authorization");
const winston = require("winston");
const logger = require("./logger.js");
var {
  OIDC_ISSUER_ADDRESS,
  OIDC_TEST_CLIENT_ID,
  OIDC_TEST_CLIENT_SECRET,
  APP_PORT,
  OIDC_SERVER_PORT,
  APP_KEY,
  APP_CERT,
  APP_ALLOWED_HEADERS,
  APP_HEADERS,
} = require("./config");

//winston.add(winston.transports.File,{filename:'koder.log'})

//winston.log('error',err.mss)
//winston.error(err)

process.on("uncaughtException", (ex) => {
  logger.log('info',"Uncuaght Excpetion" + ex);
});
/*
process.on('unhandledRejection', (ex)=>{
  logger.log('info',"Uncuaght Excpetion")
})
*/
//Process Managers

//SSL
const options = {
  key: fs.readFileSync(APP_KEY),
  cert: fs.readFileSync(APP_CERT),
};

//OIDC Provider
//https://github.com/panva/node-oidc-provider
const {
  errors: { InvalidClientMetadata },
} = Provider;
const corsProp = "urn:custom:client:allowed-cors-origins";
const isOrigin = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  try {
    const { origin } = new URL(value);
    // Origin: <scheme> "://" <hostname> [ ":" <port> ]
    return value === origin;
  } catch (err) {
    return false;
  }
};

const server = https.createServer(options, async (req, res) => {
  logger.log('info',req.headers);
  if (req.method === "OPTIONS") {
    res.writeHead(200, APP_ALLOWED_HEADERS);
    res.end();
    return;
  }

  const isTokenValid = await authorization.verifyToken(req, res);
  logger.log('info',"isTokenValid: " + isTokenValid);
  logger.log('info',req.headers);
  if (!isTokenValid) {
    res.writeHead(403, APP_HEADERS);
    res.end();
    return;
  }
//https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

  const requestURL = url.parse(req.url).pathname;
  logger.log('info',requestURL);
  if (requestURL === "/koder/api/v1.0/fees") {
    if (req.method == "GET") {
      const queryObject = url.parse(req.url, true).query;
      fees.getFeesByRegistrationID(queryObject, res);
    }
  }
  if (requestURL === "/koder/api/v1.0/login") {
    if (req.method == "POST" || req.method == "OPTIONS") {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const body = JSON.parse(crypto.decrypt(data.toString()));
        logger.log('info',(data.toString()));
        //logger.log('info',crypto.decrypt(data.toString()))
        //const body = JSON.parse(data.toString());
        login.userLogin(body, res);
      });
    }
  }
  if (requestURL === "/koder/api/v1.0/users") {
    if (req.method == "POST") {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const body = JSON.parse(crypto.decrypt(data.toString()));
        register.userRegister(body, res);
      });
    }
  }

  if (requestURL === "/koder/api/v1.0/transactions") {
    if (req.method == "GET") {
      const queryObject = url.parse(req.url, true).query;
      transactions.getTransactionByPayerID(queryObject, res);
    } else if (req.method == "POST") {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const body = JSON.parse(crypto.decrypt(data.toString()));
        transactions.postTransaction(body, res);
      });
    }
  }

  if (requestURL === "/koder/api/v1.0/refunds") {
    if (req.method == "POST") {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const body = JSON.parse(crypto.decrypt(data.toString()));
        refunds.postRefund(body, res);
      });
    }
  }
});

const oidc = new Provider(OIDC_ISSUER_ADDRESS, {
  extraClientMetadata: {
    properties: [corsProp],
    validator(ctx, key, value, metadata) {
      if (key === corsProp) {
        // set default (no CORS)
        if (value === undefined) {
          metadata[corsProp] = [];
          return;
        }
        // validate an array of Origin strings
        if (!Array.isArray(value) || !value.every(isOrigin)) {
          throw new InvalidClientMetadata(
            `${corsProp} must be an array of origins`
          );
        }
      }
    },
  },
  clientBasedCORS(ctx, origin, client) {
    // ctx.oidc.route can be used to exclude endpoints from this behaviour, in that case just return
    // true to always allow CORS on them, false to deny
    // you may also allow some known internal origins if you want to
    //return client[corsProp].includes(origin);
    return true;
  },
  clients: [
    {
      client_id: OIDC_TEST_CLIENT_ID,
      client_secret: OIDC_TEST_CLIENT_SECRET,
      grant_types: ["client_credentials"],
      redirect_uris: [],
      response_types: [],
    },
  ],
  features: {
    clientCredentials: { enabled: true },
    introspection: { enabled: true },
    devInteractions: { enabled: false },
  },
});

server.listen(APP_PORT);
logger.log('info',`server is running on ${APP_PORT}`);

oidc.listen(OIDC_SERVER_PORT, () => {
  logger.log('info',
    `oidc-provider listening on port ${OIDC_SERVER_PORT}, check http://localhost:${OIDC_SERVER_PORT}/.well-known/openid-configuration`
  );
});
