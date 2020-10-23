var express = require('express');
const authController = require('../controllers/authController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/ingresar', authController.ingresar);

router.get('/productos', authController.productos);

router.get('/detalle', authController.detalle);

router.get('/registrar', authController.registrar);

router.get('/contacto', authController.contacto);

module.exports = router;
