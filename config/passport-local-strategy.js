const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash('error', err);
                // console.log('Error in finding user --> Passport');
                // although it takes 2 arguements here we will consider only err
                return done(err); 
            }

            if(!user || user.password != password){
                req.flash('error', 'Invalid UserName/Password');
                // console.log('Invalid username/password');
                // first argument is an error
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// de-serializing the user from thr key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        return done(null ,user);
    });
});

// sending data of the current signed-in user to the ejs views

// check if user is signed-in
passport.checkAuthentication = function(req, res, next){
    // passport puts a method on req named isAuthenticated
    // if the user is signed in
    if(req.isAuthenticated()){
        // pass on the request to the next function(middleware) ie. to the controller's action
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed-in user from the session cookie and we are just sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;