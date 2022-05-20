const jwt = require('jsonwebtoken');
require('dotenv').config();

const config = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ data: user }, secret, config);
};

const checkToken = (token) => {
  const secret = process.env.JWT_SECRET;
  const { data } = jwt.verify(token, secret);
  return data;
};

module.exports = { generateToken, checkToken };
