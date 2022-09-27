const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Meta_development')


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the Mongodb'));

db.once('open', function(){
    console.log('Connected successfully to :: Mongodb');
})

module.exports = db;