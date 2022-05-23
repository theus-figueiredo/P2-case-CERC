const UserRegisters = require('../model/connection');

const updateUser = async (position, newValue, id) => {
  const user = await UserRegisters.findOne({ _id: id }).exec();
  console.log(user);

  user[position] = newValue;
  await user.save();
};

module.exports = updateUser;
