import http from "../http-common";
import axios from "axios";
import { encrypt, decrypt } from "../utils/crypto";

const REACT_APP_BACKEND_GETFEES_URL=process.env.REACT_APP_BACKEND_GETFEES_URL
const REACT_APP_BACKEND_GETTRANSACTIONS_URL=process.env.REACT_APP_BACKEND_GETTRANSACTIONS_URL
const REACT_APP_BACKEND_REGUSER_URL=process.env.REACT_APP_BACKEND_REGUSER_URL
const REACT_APP_BACKEND_LOGIN_URL=process.env.REACT_APP_BACKEND_LOGIN_URL
const REACT_APP_BACKEND_REFUNDTRANS_URL=process.env.REACT_APP_BACKEND_REFUNDTRANS_URL
const REACT_APP_BACKEND_POSTTRANS_URL=process.env.REACT_APP_BACKEND_POSTTRANS_URL
const REACT_APP_BACKEND_CLIENTID=process.env.REACT_APP_BACKEND_CLIENTID
const REACT_APP_BACKEND_SCOPES=process.env.REACT_APP_BACKEND_SCOPES
const REACT_APP_BACKEND_TOKEN_BASE_URL=process.env.REACT_APP_BACKEND_TOKEN_BASE_URL
const REACT_APP_BACKEND_TOKEN_PATH_URL=process.env.REACT_APP_BACKEND_TOKEN_PATH_URL
const REACT_APP_BACKEND_TOKEN_USERNAME=process.env.REACT_APP_BACKEND_TOKEN_USERNAME
const REACT_APP_BACKEND_TOKEN_PASSWORD=process.env.REACT_APP_BACKEND_TOKEN_PASSWORD

const getFees = async (id) => {
  const token = await getBearerToken();
  const AuthStr = "Bearer ".concat(token);
  return http.get(`${REACT_APP_BACKEND_GETFEES_URL}?registration_number=${id}`, {
    headers: { Authorization: AuthStr, 'Content-Type': 'text/plain' },
  });
};


const getTransactions = async (id) => {
  const token = await getBearerToken();
  const AuthStr = "Bearer ".concat(token);
  return http.get(`${REACT_APP_BACKEND_GETTRANSACTIONS_URL}?payer_id=${id}`, {
    headers: { 'Content-Type': 'text/plain', Authorization: AuthStr },
  });
};

const registerUser = async (data) => {
  const token = await getBearerToken();
  const AuthStr = "Bearer ".concat(token);
  return http.post(REACT_APP_BACKEND_REGUSER_URL, encrypt(data), {
    headers: { Authorization: AuthStr, 'Content-Type': 'text/plain' },
  });
};

const loginUser = async (data) => {
  const token = await getBearerToken();
  const AuthStr = "Bearer ".concat(token);
  return http.post(REACT_APP_BACKEND_LOGIN_URL, encrypt(data), {
    headers: {Authorization: AuthStr,'Content-Type': 'text/plain'},
  });
};

const refundTransaction = async (data) => {
  const token = await getBearerToken();
  const AuthStr = "Bearer ".concat(token);
  return http.post(REACT_APP_BACKEND_REFUNDTRANS_URL, encrypt(data), {
   headers: { Authorization: AuthStr, "Content-Type": "text/plain" },
  });
};

const postTransaction = async (data) => {
  console.log(data);
  const token = await getBearerToken();
  const AuthStr = "Bearer ".concat(token);
  console.log(encrypt(data));
  return http.post(REACT_APP_BACKEND_POSTTRANS_URL, encrypt(data), {
     headers: { Authorization: AuthStr, "Content-Type": "text/plain" },
  });
};

const getBearerToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", REACT_APP_BACKEND_CLIENTID);
  params.append("scopes", REACT_APP_BACKEND_SCOPES);

  try {
    const jwt = await axios
      .create({
        baseURL: REACT_APP_BACKEND_TOKEN_BASE_URL,
      })
      .post(REACT_APP_BACKEND_TOKEN_PATH_URL, params, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: REACT_APP_BACKEND_TOKEN_USERNAME,
          password: REACT_APP_BACKEND_TOKEN_PASSWORD,
        },
      });
    return jwt.data.access_token;
  } catch (err) {
    return err;
  }
};

export default {
  getTransactions,
  getFees,
  refundTransaction,
  postTransaction,
  registerUser,
  loginUser,
};
