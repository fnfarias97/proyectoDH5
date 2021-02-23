const express = require('express');
const apiController = require('../../controllers/api/apiController');
const router = express.Router();

router.get('/', apiController.usersList);

router.get('/check', apiController.checkEmail)

router.get('/:id', apiController.usersProfile);

router.post('/', apiController.newUser)



module.exports = router;