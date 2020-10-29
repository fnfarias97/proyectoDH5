const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.get('/', productsController.products);

router.get('/detalle/:id?', productsController.show);

router.get('/carrito', productsController.carrito);

router.get('/add', productsController.addProduct);

router.get('/edit/:id?', productsController.editProduct);

module.exports = router;
