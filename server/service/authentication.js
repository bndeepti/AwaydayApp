var passport = require('passport'),
  SamlStrategy = require('passport-saml').Strategy,
  config = require('../config/config');

var users = [];

function findByEmail(email, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.email === email) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
  findByEmail(id, function (err, user) {
    done(err, user);
  });
});
var samlstrategy = new SamlStrategy(
  {
    issuer: config.auth.issuer,
    path: '/login/callback',
    entryPoint: config.auth.entryPoint,
    logoutUrl:config.auth.logoutUrl,
    cert: config.auth.cert
  },
  function(profile, done) {
    if (!profile.email) {
      return done(new Error("No email found"), null);
    }
    process.nextTick(function () {
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {

          users.push(profile);
          return done(null, profile);
        }
        return done(null, user);
      })
    });
  }
)
passport.use(samlstrategy);
passport.logoutSaml = function(req, res) {
    //Here add the nameID and nameIDFormat to the user if you stored it someplace.
    
    samlstrategy.logout(req, function(err, request){
        if(!err){
            res.redirect(request);
        }
    });
};
passport.logoutSamlCallback = function(req, res){
    req.logout();
    res.redirect('/');
}
passport.protected = function protected(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports = module.exports = passport;
