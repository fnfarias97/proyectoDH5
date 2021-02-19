let db = require ('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const fs = require('fs')

let numberFormat = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,
".");

let productsController = {
    
    products : (req, res, next) => {
        let configs = {}
        if (req.query.name) {
            configs = {where: {name: { [Op.like] : '%' + req.query.name + '%'}}}
        }

        db.Products.findAll(configs)
        .then (products => {
            res.render('products/productos', { title: 'Click Players | Productos', stylesheet: 'index', products : products })
        })

    },

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

            })
        .catch(err => res.status(404).render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', product : error}) )
    },

    addProduct: (req, res) => {
        db.Product_categories.findAll()
            .then(result => {
                let categories = result
                db.Brands.findAll()
                    .then(brands => res.render('products/agregarProducto', { title: 'Click Players | Agregar producto', stylesheet: 'forms', categories, brands })
                )
            })
        
    },

    save: (req, res, next) => {
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
            include: [{model: db.Brands, as: 'Brands'}, {model: db.Product_categories, as: 'Product_categories'}]
        })
            .then(producto => {
                producto.price = numberFormat(producto.price);

                res.render('products/editarProducto', { title: 'Click Players | Modificar producto', stylesheet: 'forms', producto})
            })
            .catch(err => {
                //res.status(404).render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle' })
                res.status(404).send('Id not found')
            })
    },

    update : (req, res, next) => {
        let producto = {...req.body}
        req.files[0] != undefined ? producto.avatar = req.files[0].filename : 0;
        
        db.Products.update(producto, {where: {id: req.params.id}})
        res.redirect('/products/detalle/' + req.params.id)
    },

    remove : (req, res, next) => {
        db.Products.destroy ({where: {id: req.params.id}})
        res.redirect('/products');
    },

    detalle : (req, res) => res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle' }),

    carrito : (req, res, next) => {
        // let productsCart = [...products]           // actualizar con session 
        // productsCart.map(product => product.price = numberFormat(product.price));
        req.session.cart == undefined? req.session.cart = [] : 0;

        db.Products.findAll({
            where: {
                id : {
                    [Op.in]: req.session.cart
                }
            }
        }).then(productsCart => {
            productsCart.map(i => i.price = numberFormat(i.price))

            res.render('products/carrito', { title: 'Click Players | Carrito de productos', stylesheet: 'carrito', products : productsCart})
        })
    },

    addToCart: (req, res, next) => {
        req.session.cart == undefined? req.session.cart = [] : 0;

        req.session.cart.push(req.params.id)

        res.redirect('/products/carrito')
    },

    rmFromCart: (req, res, next) => {
        newCart = req.session.cart.filter(i => i != req.params.id)

        req.session.cart = newCart

        res.redirect('/products/carrito')
    }
}

module.exports = productsController;