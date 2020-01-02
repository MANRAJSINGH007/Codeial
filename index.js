const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/index');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');

// to store the session information into the database so that every time we restart the server, the users don't get logged out
const MongoStore = require('connect-mongo')(session);

// For converting the scss and sass files to css
const sassMiddleware = require('node-sass-middleware');

// we need both passport and passport-local for our authentication purposes
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// for reading and writing into cookies we will be using a package- cookie-parser
const cookieParser = require('cookie-parser');

// for flash messages
const flash = require('connect-flash');

const customMiddleware = require('./config/middleware');

// settings for sass middleware
app.use(sassMiddleware({
    // from where to pick up the scss files
    src: './assets/scss',
    dest: './assets/css',
    // displaying errors on console while compilation (it will be false when I will be running it in production mode)
    debug: true,
    outputStyle: 'extended',
    // where should my server lookout for css files
    prefix: '/css'
}));

// for reading the data sent by post requests
app.use(express.urlencoded());

// for reading and modifying the cookies
app.use(cookieParser());

// If you use assets then, in the layout.ejs file you need to provide the path of the file relative to the assets folder
app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// using the layout.ejs file
app.use(expressLayouts);

// Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Setting up ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the DB
app.use(session({
    name: 'codeial',
    // ToDo change the secret before deployement in production mode
    secret: 'blahsomething',
    // when the user has not been logged in 
    saveUninitialized: false,
    // don't change the cookie information
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })

}));

app.use(passport.initialize());
app.use(passport.session());

// set up the current user usage
app.use(passport.setAuthenticatedUser);

// using connect-flash library, it uses session cookies
app.use(flash());
app.use(customMiddleware.setFlash);

// use express router
app.use('/', router);

app.listen(port, function(err){
    
    if(err){
        console.log(`Error in running the server: ${err}`);
        return ;
    }

    console.log(`Server is running on port: ${port}`);
})