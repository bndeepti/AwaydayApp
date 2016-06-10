var config={};
var auth={};
auth.issuer=process.env.AWAYDAY_ISSUER;
auth.entryPoint=process.env.AWAYDAY_ENTRY_PONT;
auth.logoutUrl=process.env.AWAYDAY_LOGOUT_URL;
auth.cert=process.env.AWAYDAY_CERT;
config.auth=auth;

var jigsaw={};
jigsaw.apiUrl=process.env.JIGSAW_API_URL;
jigsaw.authtoken=process.env.JIGSAW_API_AUTH_TOKEN;
jigsaw.locations="Bangalore,Chennai,Gurgaon";//,Chennai,Hyderabad,Pune,Gurgaon"
config.jigsaw=jigsaw;
module.exports = config;