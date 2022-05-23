const UserRegisters = require('../model/connection');
const md5 = require('md5');


const checkIfUserCanLogin = async (email, password) => {
  const user = await UserRegisters.findOne({ email }).exec();
  
  if (user) {
    if (user.password === md5(password)) return user
  };

  return false;
};

module.exports = checkIfUserCanLogin;
