const router = require('express').Router();
const userLogin = require('../controller/userLogin');

router.post('/', userLogin);

module.exports = router;
