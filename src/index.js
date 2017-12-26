import express from "express";
import path from "path";
import sequelize from "sequelize";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import promise from "bluebird";
import volleyball from 'volleyball';

import db from './db';

// The Routers
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import gamesRouter from './routes/games';
import fieldsRouter from './routes/fields';

require('dotenv').config();
const app = express();

// logging middleware
app.use(volleyball);
// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files like images, css, html, etc
// any get request that matches a particular file in the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// API routers to serve up data from the server
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/games', gamesRouter);
app.use('/api/fields', fieldsRouter);

const router=express.Router();
const authController=require('./routes/auth');
process.env.JWT_SECRET="secretkey";

app.use('/secure-api',router);


/* // validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, function(err,ress) {
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})

router.get('/home',function(req,res){
    res.send('Token Verified')
}) */

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));

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

// app.listen(8080, () => console.log("Running on localhost:8080"));