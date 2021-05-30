module.exports = {
  OIDC_ISSUER_ADDRESS:
    process.env.OIDC_ISSUER_ADDRESS || "http://localhost:2000",
  OIDC_PROVIDER_ADDRESS:
    process.env.OIDC_PROVIDER_ADDRESS || "http://localhost:2000",
  OIDC_TEST_CLIENT_ID: process.env.OIDC_TEST_CLIENT_ID || "test_oauth_app",
  OIDC_TEST_CLIENT_SECRET:
    process.env.OIDC_TEST_CLIENT_SECRET || "super_secret",
  APP_PORT: process.env.KODER_PORT || "4000",
  OIDC_SERVER_PORT: process.env.OIDC_SERVER_PORT || "2000",
  APP_KEY: process.env.APP_KEY || "key.pem",
  APP_CERT: process.env.APP_CERT || "cert.pem",
  

  APP_DB_HOST: process.env.APP_DB_HOST || "localhost",
  APP_DB_USER: process.env.APP_DB_USER || "root",
  APP_DB_PASSWORD: process.env.APP_DB_PASSWORD || "Learnhard123@",
  APP_DB_DATABASE: process.env.APP_DB_DATABASE || "koder",
/*
APP_DB_HOST: process.env.APP_DB_HOST || "us-cdbr-east-03.cleardb.com",
APP_DB_USER: process.env.APP_DB_USER || "bd75cff38b416b",
APP_DB_PASSWORD: process.env.APP_DB_PASSWORD || "9ed29f04",
APP_DB_DATABASE: process.env.APP_DB_DATABASE || "heroku_897dcbc1feb8571",
*/
  APP_ENCRYPTION_KEY:
    process.env.APP_ENCRYPTION_KEY || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
  APP_ALLOWED_HEADERS: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Content-Type": "text/plain",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  },
  APP_HEADERS: {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
  },

  //CORS

  //NAME_OF_CONFIG: process.env.NAME_OF_CONFIG || 'default-config',
  //X_ENABLED: process.env.X_ENABLED === 'true',
};
