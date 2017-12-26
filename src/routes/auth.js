import express from 'express';
import eslint from "eslint";
import bcrypt from "bcryptjs";
import User from '../models/user';
import {generateJWT} from '../utils/helper.js';

const router = require('express').Router();
process.env.JWT_SECRET="secretkey";

module.exports = router;

router.post("", (req, res) => {
    const { credentials } = req.body;
    User.findOne({ where: { email: credentials.email } }).then(dbUser => {
        console.log(dbUser)
        
        if (dbUser) {
            bcrypt.compare(credentials.password, dbUser.dataValues.passwordHash)
                .then( Res => {
                    console.log('Credentials are GOOD!!')
                    if (Res) {
                        const token = generateJWT(dbUser.dataValues.email)
                        res.status(200).json({token: token})
                        console.log('Token Passed!!')
                    } else {
                        res.status(400).json({ errors: { global: "Invalid User Credentials" } });
                    }
                })
            
        } else {
            res.status(400).json({ errors: { global: "Invalid User Credentials" } });
        }
    });
});



//This is a catch all if the requested route does not exist.
router.use('*', function(req, res, next) {
    res.send('The requested AUTH route does not exist in this api.')
  });
export default router;