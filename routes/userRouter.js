const express = require('express');
const authController = require('../controller/authcontroller');
const router = express.Router();

router.get('/login', authController.logIn);
router.get('/signup', authController.signUp);

module.exports = router;
