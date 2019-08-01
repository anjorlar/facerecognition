const express = require('express');

const userController = require('../../controller/user');
const router = express.Router();

/**
 * Creates a new user
 */

router.post('/', userController.postUser);

module.exports = router;