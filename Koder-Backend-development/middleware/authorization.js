const axios = require("axios");
const querystring = require("querystring");
var {
  OIDC_PROVIDER_ADDRESS,
  OIDC_TEST_CLIENT_ID,
  OIDC_TEST_CLIENT_SECRET,
} = require("../config");
//const config = require("config");
//const tokenIntroSpectionUrl = config.get("props.system.introspectionUrl");

const verifyToken = (req, res) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const isTokenValid = verifyAccessToken(bearerToken);
    return isTokenValid;
  } else {
    return false;
  }
};

const verifyAccessToken = async (token) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("scopes", "koder");

  try {
    const jwt = await axios
      .create({
        baseURL: OIDC_PROVIDER_ADDRESS,
      })
      .post(
        "/token/introspection",
        querystring.stringify({
          token,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: OIDC_TEST_CLIENT_ID,
            password: OIDC_TEST_CLIENT_SECRET,
          },
        }
      );
    return jwt.data.active;
  } catch (err) {
    return err;
  }
};

module.exports = {
  verifyToken,
};
