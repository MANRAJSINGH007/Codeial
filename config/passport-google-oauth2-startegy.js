const passport = require('passport');
const googleStartegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new startegy for google login
passport.use(new googleStartegy({
    clientID: "YOUR-CLIENT-ID",
    clientSecret: "YOUR-CLIENT-SECRET",
    callbackURL: "YOUR-CALLBACK-URL",
    }, 
    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
            if(err) {
                console.log('Error in google startegy passport', err);
                return;
            }
            console.log(profile);
            // if user is found
            if(user) {
                return done(null, user);
            }
            // create a user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user) {
                if(err) {
                    console.log('Error in creating the user', err);
                    return;
                }
                return done(null, user);
            });
        });
    }
));

module.exports = passport;