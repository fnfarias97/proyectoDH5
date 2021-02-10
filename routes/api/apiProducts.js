const express = require('express');
const apiController = require('../../controllers/api/apiController');
const router = express.Router();

router.get('/', apiController.productsList);

router.get('/:id', apiController.productDetail);



module.exports = router;