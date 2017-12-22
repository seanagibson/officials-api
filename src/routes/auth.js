import express from 'express';
import eslint from "eslint";
import bcrypt from "bcryptjs";
import User from '../models/user';

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
                        const token=jwt.sign(results[0],process.env.JWT_SECRET,{
                            expiresIn:5000
                        });
                        res.json({
                            status:true,
                            token:token
                        })
                        res.status(200).json({data: {user:dbUser.dataValues.toAuthJSON()}})
                    } else {
                        res.json({
                            status:false,                  
                            message:"Email and password does not match"
                        })
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