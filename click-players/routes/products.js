const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.get('/', productsController.products);

router.get('/detalle/:id?', productsController.show);

router.get('/carrito', productsController.carrito);

module.exports = router;
