let db = require ('../database/models');
// const fs = require('fs')

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

    addProduct: (req, res) => {
        db.ProductCategories.findAll()
            .then(result => {
                let categories = result
                db.Brands.findAll()
                    .then(brands => res.render('products/agregarProducto', { title: 'Click Players | Agregar producto', stylesheet: 'forms', categories, brands })
                )
            })
        
    },

    save: (req, res) => {
        let producto = {
            ...req.body,
            avatar: req.files[0].filename
        }

        db.Products.create(producto)
        res.redirect('/products');        
    },

    editProduct: (req, res) => {
        db.Products.findOne({
            where: {id: req.params.id},
            include: [{model: db.Brands, as: 'Brands'}, {model: db.ProductCategories, as: 'ProductCategories'}]
        })
            .then(producto => {
                producto.price = numberFormat(producto.price);

                console.log(producto.Brands);
                res.render('products/editarProducto', { title: 'Click Players | Modificar producto', stylesheet: 'forms', producto})
            })
            .catch(err => {
                // res.status(404).render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle'})
                res.status(404).send('Id not found')
            })
    },

    update : (req, res, next) => {
        let producto = {
            ...req.body,
            avatar: req.files[0].filename
        }

        db.Products.update(producto, {where: {id: req.params.id}})
        res.redirect('/products/detalle/' + req.params.id)},

    remove : (req, res, next) => {
        db.Products.destroy ({where: {id: req.params.id}})
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