import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'validator';
import { generateJWT } from '../utils/helper.js';
const db = require('../db');
const saltRounds = 10;
// TODO: add uniqueness and email validations to email field

const User = db.define('user', {
  email: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
    validate: {
      len: {
        args: [6, 128],
        msg: 'Email address must be between 6 and 128 characters in legth',
      },
      /*  isUnique: function (value, next) {
                var self = this;
                User.find({where: {email: value}})
                    .then(function (user) {
                        // reject if a different user wants to use the same email
                        if (user && self.id !== user.id) {
                            return next('Email already in use!');
                            res.status(400).json({ errors: { global: "Invalid Credentials" } });
                        }
                        return next();
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            } */

      /* isEmail: {
                msg: "Email address must be valid"
            },
            isUnique: function(value, next) {
                UserModel.find({
                    where: {email: value},
                    attributes: ['id']
                })
                    .done(function(error, user) {
                        if (error)
                            // Some unexpected error occured with the find method.
                            return next(error);
                        if (user)
                            // We found a user with this email address.
                            // Pass the error to the next method.
                            return next('Email address already in use!');
                        // If we got this far, the email address hasn't been used yet.
                        // Call next with no arguments when validation is successful.
                        next();
                    });
            } */
    },
  },
  passwordHash: {
    type: sequelize.STRING,
    allowNull: false,
  },
  confirmed: {
    type: sequelize.BOOLEAN,
    default: false,
  },
  confirmationToken: {
    type: sequelize.STRING,
    default: false,
  },
});

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.passwordHash, 10)
    .then(hash => {
      user.passwordHash = hash;
    })
    .catch(err => {
      throw new Error();
    });
});

// These are things I need to translate to NODE

/* schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
  };
  schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
  };
  schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${process.env
      .HOST}/reset_password/${this.generateResetPasswordToken()}`;
  };

  schema.methods.generateJWT = function generateJWT() {
    return jwt.sign(
      {
        email: this.email,
        confirmed: this.confirmed
      },
      process.env.JWT_SECRET
    );
  };
  
  schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign(
      {
        _id: this._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  };
  
  schema.methods.toAuthJSON = function toAuthJSON() {
    return {
      email: this.email,
      confirmed: this.confirmed,
      token: this.generateJWT()
    };
  }; */

module.exports = User;
