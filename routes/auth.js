const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const registerValidate = require ('../middlewares/registerValidate')

router.get('/ingresar', authController.ingresar);

router.post('/ingresar', authController.login);

router.get('/registrar', authController.registrar);

router.post('/registrar', registerValidate, authController.store);

router.get('/perfil', authController.perfil)

module.exports = router;
