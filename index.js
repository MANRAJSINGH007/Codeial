const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/index');
const db = require('./config/mongoose');

// If you use assets then, in the layout.ejs file you need to provide the path of the file relative to the assets folder
app.use(express.static('./assets'));

app.use(expressLayouts);

// Extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', router);

// Setting up ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    
    if(err){
        console.log(`Error in running the server: ${err}`);
        return ;
    }

    console.log(`Server is running on port: ${port}`);
})