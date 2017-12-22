var express = require('express');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./src/db');

//The Routers
var gamesRouter = require('./src/routes/games');
var fieldRouter = require('./src/routes/fields');

// instantiate an instance of an express server
var app = express();


// logging middleware
app.use(volleyball);
// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files like images, css, html, etc
// any get request that matches a particular file in the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// API routers to serve up data from the server
app.use('/games', gamesRouter);
app.use('/fields', fieldRouter);


//This is a catch all if the requested route does not exist.
app.use('*', function(req, res, next) {
    res.send('The requested route does not exist in this api.')
})

// There is not specific error handling, just letting express do it itself with it's default
// See https://expressjs.com/en/guide/error-handling.html 'The Default Error Handler'

var server = app.listen(8080, function() {
    console.log('listening on port', server.address().port)
        //    
    db.sync()
        .then(message => {
            console.log(' and the db is synced');
        })
        .catch(function(err) {
            throw (err);
        });
});