const express = require('express');
const app = express();
const port = 3500;

app.listen(port, function(err){
        if(err){
            console.log(`Error occured on server, ${err}`);
        }{
            console.log(`Server up and running on ${port}`)
        }
})