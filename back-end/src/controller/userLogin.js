const { checkIfUserCanLogin } = require('../service');
const jwtActions = require('../helpers/jwtActions');

const userLogin = async (req, res, next) => {
 const { email, password } = req.body;

 const canLogin = await checkIfUserCanLogin(email, password);
 if (!canLogin) return res.status(404).json({ message: "email ou senha incorretos" });

 const token = jwtActions.generateToken(canLogin);
 return res.status(200).json(token);
}

module.exports = userLogin;
