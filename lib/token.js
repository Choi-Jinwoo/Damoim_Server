require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.createToken = async (id) => {
  const payload = {
    id,
  };
  const options = {
    expiresIn: '24h',
    issuer: 'Damoim',
    subject: 'token',
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

exports.verifyToken = async (token) => {
  return jwt.verify(token, JWT_SECRET);
};
