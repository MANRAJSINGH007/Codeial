const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/index');


app.use(expressLayouts);

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