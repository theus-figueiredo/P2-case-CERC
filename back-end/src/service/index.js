const createUser = require('./createUser');
const checkIfUserInfoIsTaken = require('./validateUser');
const checkIfUserCanLogin = require('./userlogin');
const updateUser = require('./updateUser');

module.exports = { createUser, checkIfUserInfoIsTaken, checkIfUserCanLogin, updateUser };
