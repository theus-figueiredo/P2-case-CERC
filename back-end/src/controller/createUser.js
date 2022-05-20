const { checkIfUserInfoIsTaken, createUser } = require('../service');

const validateUserCreation = async (req, res, next) => {
  const { email, cnpj } = req.body;

  const doesUserExist = await checkIfUserInfoIsTaken(email, cnpj);
  if(doesUserExist) return res.status(409).json(doesUserExist.message);

  next();
};

const createNewUser = async (req, res, _next) => {
  const { name, email, cnpj, password } = req.body;
  const newUser = await createUser(email, name, password, cnpj);

  return res.status(201).json(newUser);
};

module.exports = { validateUserCreation, createNewUser };
