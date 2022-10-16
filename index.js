const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3500;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//Used for session cookie and passport authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-Local-strategy');
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))



app.use(express.urlencoded());

// app.use(express.cookieParser());

app.use(express.static('./assets'));

//Using layouts
app.use(expressLayouts);

//Extract styles and scripts from subpages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// Setting up our view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo-Store is used to store the session cookie in database
app.use(session({
    name:'MetaVerse',
    secret: 'hellosomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
        },
        store: MongoStore.create(
            {
                mongoUrl: 'mongodb://localhost/Meta_development',
                mongooseConnection: db,
                autoRemove: 'disabled'
            },
            function(err){
                console.log(err || 'connect-mongodb setup ok');
            }
        )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);


//Used Express Router
app.use('/', require('./routes'))

app.listen(port, function(err){
        if(err){
            console.log(`Error occured on server, ${err}`);
        }{
            console.log(`Server up and running on ${port}`)
        }
})