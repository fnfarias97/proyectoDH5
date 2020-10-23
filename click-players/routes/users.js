var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/regristrar', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ingresar', userController.ingresar);

router.get('/productos', userController.productos);

router.get('/detalle', userController.detalle);

router.get('/registrar', userController.registrar);

router.get('/contacto', userController.contacto);

module.exports = router;
