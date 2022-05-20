const router = require('express').Router();
const { validateUserCreation, createNewUser } = require('../controller/createUser');

router.post('/', validateUserCreation, createNewUser);

module.exports = router;
