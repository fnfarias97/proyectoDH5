const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();
const multer = require('multer');
const path = require('path')
<<<<<<< HEAD
const {productsMiddleware, validateProduct} = require('../middlewares/productsMiddleware')
const {isLogged} = require('../middlewares/authMiddleware')
=======
const {isLogged} = require('../middlewares/authMiddleware');
const {adminValidate} = require('../middlewares/authMiddleware');
>>>>>>> b700a52... edit adminValidate

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })


var upload = multer({ storage: storage })

router.get('/', adminValidate, productsController.products);

router.get('/detalle/:id?', adminValidate, productsController.detalle);

router.get('/client', productsController.client);

router.get('/client/detalle/:id?', productsController.clientDetail);

router.get('/carrito', productsController.carrito);

router.post('/cart/add/:id', productsController.addToCart)

router.post('/cart/subs/:id', productsController.subsFromCart)

router.post('/cart/rm/:id', productsController.rmFromCart)

router.get('/add', isLogged, productsController.addProduct);

router.post('/add', upload.any(), productsMiddleware(), validateProduct , productsController.save);

router.get('/edit/:id', isLogged, productsController.editProduct);

router.put('/edit/:id', upload.any(), productsController.update);

router.delete('/remove/:id', productsController.remove);

module.exports = router;
