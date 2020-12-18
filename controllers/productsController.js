let db = require ('../database/models');
const fs = require('fs')

let numberFormat = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,
".");

let productsController = {
    
    products : (req, res, next) => {
            db.Products.findAll()
            .then (products => {
                res.render('products/productos', { title: 'Click Players | Productos', stylesheet: 'index', products : products })
            })
    }
    ,
    show: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then (product => {
            if (db != undefined){
                res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', product : product})
            }
        
        let error = {
            nombre: 'Lo sentimos',
            precio: '0',
            descripcion: 'El producto no existe',
            avatar: 'producto-no-encontrado.png'
        }

        res.status(404).render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', product : error}) }) 
    },

    addProduct: (req, res) => res.render('products/agregarProducto', { title: 'Click Players | Agregar producto', stylesheet: 'forms' }),

    save: (req, res) => {
        let producto = {
            id: products [products.length-1].id+1,
            ...req.body,
            avatar: req.files[0].filename
        }

        products.push(producto)

        fs.writeFileSync('./data/productos.json', JSON.stringify(products, null, 4));
        res.redirect('/products');        
    },

    editProduct: (req, res) => {
        let producto = products.find((e) => e.id == req.params.id);
        producto.price = numberFormat(producto.price);

        if (producto != undefined){
            res.render('products/editarProducto', { title: 'Click Players | Modificar producto', stylesheet: 'forms', producto})
        }

        let error = {
            name: 'Lo sentimos',
            price: '0',
            description: 'El producto no existe',
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
        let productsCart = [...products]           // actualizar con session 
        productsCart.map(product => product.price = numberFormat(product.price));

        res.render('products/carrito', { title: 'Click Players | Carrito de productos', stylesheet: 'carrito', products : productsCart})
    }
}

module.exports = productsController;