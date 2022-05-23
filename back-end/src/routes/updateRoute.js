const router = require('express').Router();
const { validateToken, updateMiddleware } = require('../controller/updateUser');

router.patch('/:id', validateToken, updateMiddleware);

module.exports = router;