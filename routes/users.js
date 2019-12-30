const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controllers');

// over here you need to use passport-local-strategy.js from the config file
router.get('/profile/:id', require('../config/passport-local-strategy').checkAuthentication,usersController.profile);
router.post('/update/:id', require('../config/passport-local-strategy').checkAuthentication,usersController.update);


router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

// use passport as a middleware to authenticate
// if passport authentication is done usersController.createSession is called in the users controller
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;