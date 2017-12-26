import express from 'express';
import eslint from "eslint";
import user from '../models/user';
import parseErrors from '../utils/parseErrors';
import sendCofirmationEmail from '../utils/mailer.js';

const router = express.Router();
// const user = require('../models/user');

/* router.post("/", (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user
    .save()
    .then(userRecord => {
      sendConfirmationEmail(userRecord);
      res.json({ user: userRecord.toAuthJSON() });
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
}); */

//Find all users
router.get('/', function(req, res, next) {
  user.findAll({
          include: [{ all: true }]
      })
      .then(res.send.bind(res))
      .catch(next);
  });

//Create a new user
router.post('/', function(req, res, next) {
  user.create(req.body)
     .then(function(user) {
//       sendConfirmationEmail(userRecord);
       res.send(user);
     }) 
  });
//This is a catch all if the requested route does not exist.
router.use('*', function(req, res, next) {
  res.send('The requested USER route does not exist in this api.')
});

export default router;