var config={};
var auth={};
auth.issuer=process.env.AWAYDAY_ISSUER;
auth.entryPoint=process.env.AWAYDAY_ENTRY_PONT;
auth.logoutUrl=process.env.AWAYDAY_LOGOUT_URL;
auth.cert=process.env.AWAYDAY_CERT;
config.auth=auth;
module.exports = config;