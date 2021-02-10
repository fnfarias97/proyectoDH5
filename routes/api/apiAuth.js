const express = require('express');
const apiController = require('../../controllers/api/apiController');
const router = express.Router();

router.get('/', apiController.usersList);

router.get('/:id', apiController.usersProfile);



module.exports = router;