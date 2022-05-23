const { checkIfUserInfoIsTaken, createUser } = require('../service');
const _ = require('lodash');

const validateUserCreation = async (req, res, next) => {
  const { email } = req.body;

  const doesUserExist = await checkIfUserInfoIsTaken(email);
  if(doesUserExist) return res.status(409).json(doesUserExist.message);

  next();
};

const createNewUser = async (req, res, _next) => {
  const { name, email, phone, password } = req.body;
  const newUser = await createUser(email, name, password, phone);
  const userInfo = _.pick(newUser, ['_id', 'email', 'name', 'phone']);

  return res.status(201).json(userInfo);
};

module.exports = { validateUserCreation, createNewUser };
