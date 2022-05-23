const UserRegisters = require('../model/connection');

const checkIfUserInfoIsTaken = async (email) => {
  
  const emailAlreadyExists = await UserRegisters.findOne({ email }).exec();

  if (emailAlreadyExists) return { message: 'Usuário já cadastrado'};

  return false;
};

module.exports = checkIfUserInfoIsTaken;
