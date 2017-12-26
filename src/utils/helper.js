import jwt from "jsonwebtoken";


exports.generateJWT = function(email) {
  return jwt.sign(
    {
      email: email
    },
    process.env.JWT_SECRET, {
      expiresIn: '12h'
    })
  }