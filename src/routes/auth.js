import express from 'express';
import eslint from 'eslint';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { generateJWT, verifyJWT } from '../utils/helper.js';

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } }).then(dbUser => {
    if (dbUser) {
      bcrypt.compare(password, dbUser.dataValues.passwordHash).then(Res => {
        console.log('Credentials are GOOD!!');
        if (Res) {
          const token = generateJWT(dbUser.dataValues.email);
          res.status(200).json({ token: token });
          console.log('Token Passed!!');
        } else {
          res.status(400).json({ errors: { global: 'Invalid User Credentials' } });
        }
      });
    } else {
      res.status(400).json({ errors: { global: 'Invalid User Credentials' } });
    }
  });
};

exports.validateToken = (req, res) => {
  const { token } = req.body;
  const { status } = verifyJWT(token);
  res.status(status);
};
