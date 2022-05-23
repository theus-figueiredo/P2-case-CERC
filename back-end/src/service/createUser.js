const md5 = require('md5');
const UserRegisters = require('../model/connection');

const createUser = async (email, name, password, phone) => {
  const hashedPassword = md5(password);
  
  const newUser = new UserRegisters({
    email,
    name,
    password: hashedPassword,
    phone,
  });
  
  await newUser.save();
  return newUser;
};

module.exports = createUser;
