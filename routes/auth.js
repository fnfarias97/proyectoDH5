const express = require('express');
const authController = require('../controllers/authController');
const {registerValidations, loginValidations, validateRegister, validateLogin, isLogged, isNotLogged} = require('../middlewares/authMiddleware');
const router = express.Router();
const multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.get('/ingresar', isNotLogged, authController.ingresar);

router.post('/ingresar', loginValidations(), validateLogin, authController.login);

router.get('/logout', isLogged, authController.logout)

router.get('/registrar', isNotLogged, authController.registrar);

router.post('/registrar', registerValidations(), validateRegister, authController.store);

router.get('/perfil', isLogged, authController.editProfile);

router.post('/perfil', upload.any(), isLogged, authController.update);


module.exports = router;
