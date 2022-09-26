const express = require('express');
const app = express();
const port = 3500;
const expressLayouts = require('express-ejs-layouts');


app.use(expressLayouts);

//Used Express Router
app.use('/', require('./routes'))


// Setting up our view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
        if(err){
            console.log(`Error occured on server, ${err}`);
        }{
            console.log(`Server up and running on ${port}`)
        }
})