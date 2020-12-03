const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {isLogged} = require('../middlewares/authMiddleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', productsController.products);

router.get('/detalle/:id?', productsController.show);

router.get('/carrito', isLogged, productsController.carrito);

router.get('/add', isLogged, productsController.addProduct);

router.post('/add', upload.any(), productsController.save);

router.get('/edit/:id', isLogged, productsController.editProduct);

router.put('/edit/:id', upload.any(), productsController.update);

router.delete('/remove/:id', productsController.remove);

module.exports = router;
