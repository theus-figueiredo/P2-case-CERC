const createUser = require('./createUser');
const checkIfUserInfoIsTaken = require('./validateUser');
const checkIfUserCanLogin = require('./userlogin');

module.exports = { createUser, checkIfUserInfoIsTaken, checkIfUserCanLogin };
