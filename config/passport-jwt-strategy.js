const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
// module to extract the json web token from the header
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

// how to encrypt
// header is a list of keys

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "codeial"
};

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function(err, user) {
        if(err) {
            console.log('Error in finding user from jwt');
            return;
        }
        if(user) {
            return done(null, user);
        } else{
            return done(null, false);
        }
    });
}));

module.exports = passport;