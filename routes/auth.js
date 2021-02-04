const express = require('express');
const authController = require('../controllers/authController');
const {registerValidations, loginValidations, validateRegister, validateLogin, isLogged, isNotLogged} = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/ingresar', isNotLogged, authController.ingresar);

router.post('/ingresar', authController.login);

router.get('/logout', isLogged, authController.logout)

router.get('/registrar', isNotLogged, authController.registrar);

router.post('/registrar', registerValidations(), validateRegister, authController.store);

router.get('/perfil', isLogged, authController.perfil)


module.exports = router;
