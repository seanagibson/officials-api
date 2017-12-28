require('dotenv').config();
import jwt from 'jsonwebtoken';

exports.generateJWT = function(email) {
  return jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '12h',
    }
  );
};

exports.verifyJWT = token => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return { status: 401 };
    }
    return { status: 200 };
  });
};
