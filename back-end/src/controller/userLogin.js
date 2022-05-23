const { checkIfUserCanLogin } = require('../service');
const jwtActions = require('../helpers/jwtActions');
const _ = require('lodash');

const userLogin = async (req, res) => {
 const { email, password } = req.body;

 const user = await checkIfUserCanLogin(email, password);
 if (!user) return res.status(404).json({ message: "email ou senha incorretos" });

 const userInfo = _.pick(user, ['_id', 'name', 'email', 'phone']);

 const token = jwtActions.generateToken(user);
 return res.status(200).json({ token, userInfo });
}

module.exports = userLogin;
