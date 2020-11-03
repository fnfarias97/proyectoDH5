const products = require ('../data/productos.json');
const fs = require('fs')

let productsController = {
    
    products : (req, res) => res.render('products/productos', { title: 'Click Players | Productos', stylesheet: 'index' }),
    
    show: (req, res) => {
        let producto = products.find((e) => e.id == req.params.id);
        producto.precio = producto.precio.toString() . replace( /\B(?=(\d{3})+(?!\d))/g,
        "." ) ;

        if (producto != undefined){
            res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', producto})
        }

        let error = {
            nombre: 'Lo sentimos',
            precio: '0',
            descripcion: 'El producto no existe',
            avatar: 'producto-no-encontrado.png'
        }

        res.status(404).render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', producto : error})
    },

    addProduct: (req, res) => res.render('products/agregarProducto', { title: 'Click Players | Agregar producto', stylesheet: 'forms' }),

    editProduct: (req, res) => {
        let producto = products.find((e) => e.id == req.params.id);
        producto.precio = producto.precio.toString() . replace( /\B(?=(\d{3})+(?!\d))/g,
        "." ) ;

        if (producto != undefined){
            res.render('products/editarProducto', { title: 'Click Players | Modificar producto', stylesheet: 'forms', producto})
        }

        let error = {
            nombre: 'Lo sentimos',
            precio: '0',
            descripcion: 'El producto no existe',
            avatar: 'producto-no-encontrado.png'
        }

        res.status(404).render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', producto : error})
    },

    update : (req, res, next) => {
        let productsCopy = [...products]
        let product = productsCopy.find(e => e.id == req.params.id);

        let avatar = product.avatar
        if (req.files[0] != undefined) { avatar = req.files[0].filename }

        productsCopy = productsCopy.map( e => {
            if (e.id == product.id) {
                e = {
                    id:product.id,
                    ...req.body,
                    avatar: avatar
                }
            }
            return e;
        });

        fs.writeFileSync('./data/productos.json', JSON.stringify(productsCopy, null, 4));
        res.redirect('/products');
    },

    remove : (req, res, next) => {
        let productsCopy = [...products]
        let product = productsCopy.find(e => e.id == req.params.id);
        productsCopy = productsCopy.filter(e => e.id != product.id);

        fs.writeFileSync('./data/productos.json', JSON.stringify(productsCopy, null, 4));
        res.redirect('/products');
    },

    detalle : (req, res) => res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle' }),

    carrito : (req, res) => {
        let productsCart = [...products]
        res.render('products/carrito', { title: 'Click Players | Carrito de productos', stylesheet: 'carrito', products : productsCart})
    }
}

module.exports = productsController;