const express = require('express');
const authenticate = require('../../middleware/auth');
const authController = require('../../controller/auth');

const router = express.Router();

router.post('/', authController.postLogin);
router.get('/signin', authenticate, authController.getCurrentUser);

module.exports = router;