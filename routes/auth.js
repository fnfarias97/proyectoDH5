const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/ingresar', authController.ingresar);

router.post('/ingresar', authController.login);

router.get('/registrar', authController.registrar);

router.post('/registrar', authController.store);

router.get('/perfil', authController.perfil)

module.exports = router;
