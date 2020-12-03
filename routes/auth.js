const express = require('express');
const authController = require('../controllers/authController');
const {registerValidations, loginValidations, validateRegister, validateLogin} = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/ingresar', authController.ingresar);

router.post('/ingresar', loginValidations(), validateLogin, authController.login);

router.get('/logout', authController.logout)

router.get('/registrar', authController.registrar);

router.post('/registrar', registerValidations(), validateRegister, authController.store);

router.get('/perfil', authController.perfil)


module.exports = router;
