const express = require('express');
const apiController = require('../../controllers/api/apiController');
const {registerValidations, loginValidations, validateRegister, validateLogin, isLogged, isNotLogged} = require('../../middlewares/authMiddleware');
const router = express.Router();

router.get('/', apiController.usersList);

router.get('/check', apiController.checkEmail)

router.get('/:id', apiController.usersProfile);

router.post('/', registerValidations(), validateRegister, apiController.newUser)

router.post('/login', apiController.login)



module.exports = router;