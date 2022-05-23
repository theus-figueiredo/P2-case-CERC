const { checkIfUserInfoIsTaken, updateUser } = require('../service');
const jwtActions = require('../helpers/jwtActions');


const validateToken = (req, res, next) => {
  try {
    const { auth } = req.headers;
    if (!auth) return res.status(400).json({ message: 'token de autenticação não encontrado' });
    jwtActions.checkToken(auth);

    next();
  } catch (e) {
    return res.status(400).json({ message: 'autenticação inválida' });
  };
};

const updateMiddleware = async (req, res) => {
  const { newInfo: { position, newValue } } = req.body;
  const { id } = req.params;
  
  if (position === 'email') {
    const isTaken = await checkIfUserInfoIsTaken(newValue);
    if (isTaken) return res.status(409).json(isTaken.message);
  }

  await updateUser(position, newValue, id);
  return res.status(200).json({ message: 'updated' });
};

module.exports = { updateMiddleware, validateToken };
