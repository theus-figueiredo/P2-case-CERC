const UserRegisters = require('../model/connection');

const checkIfUserInfoIsTaken = async (email, cnpj) => {
  
  const emailAlreadyExists = await UserRegisters.findOne({ email }).exec();
  const cnpjAlreadyExists = await UserRegisters.findOne({ cnpj }).exec();

  if (emailAlreadyExists || cnpjAlreadyExists) return { message: 'Usuário já cadastrado'};

  return false;
};

module.exports = checkIfUserInfoIsTaken;
