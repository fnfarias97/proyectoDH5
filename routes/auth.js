const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/ingresar', authController.ingresar);

router.get('/registrar', authController.registrar);

module.exports = router;
