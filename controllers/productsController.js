let db = require ('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const fs = require('fs')

let numberFormat = n => n.toString().replace( /\B(?=(\d{3})+(?!\d))/g,
".");

const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  })

let productsController = {
    
    products : (req, res, next) => {
        let queryConfig = {}
        if (req.query.name) {
            queryConfig = {where: {name: { [Op.like] : '%' + req.query.name + '%'}}}
        }

        db.Products.findAll(queryConfig)
        .then (products => {
            products.map(i => i.price = formatter.format(i.price))

            res.render('products/productos', { title: 'Click Players | Productos', stylesheet: 'index', products : products })
        })

    },

    show: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then (product => {
            product.price = formatter.format(product.price)

            res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', product : product})

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
        let cartIds = req.session.cart.map(i => i.id) 
        
        db.Products.findAll({
            where: {
                id : {
                    [Op.in]: cartIds
                }
            }
        }).then(productsCart => {
            productsCart.map(i => {
                let cartItem = req.session.cart.find(x => x.id == i.id)

                
                i.qty = cartItem.qty
                i.subt = i.qty * i.price
                i.subtotal = formatter.format(i.subt)
                i.price = formatter.format(i.price)
            })
        
            let total = productsCart.reduce((a,b) => a + b.subt, 0)
            total = formatter.format(total)

            res.render('products/carrito', { title: 'Click Players | Carrito de productos', stylesheet: 'carrito', products : productsCart, total})
        })
    },

    client: (req,res, next) => {
        if (req.query.name) {
            db.Products.findAll({where: {name: { [Op.like] : '%' + req.query.name + '%'}}})
            .then (products => {
                res.render('products/products', { title: 'Click Players | Productos', stylesheet: 'index', products : products })
            })
        } else {
            db.Products.findAll()
            .then (products => {
                res.render('products/products', { title: 'Click Players | Productos', stylesheet: 'index', products : products })
            })
        }

    },
    clientDetail: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then (product => {
            if (db != undefined){
                res.render('products/detail', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', product : product})
            }
        

            let error = {
                nombre: 'Lo sentimos',
                precio: '0',
                descripcion: 'El producto no existe',
                avatar: 'producto-no-encontrado.png'
            }

            })
        .catch(err => res.status(404).render('products/detail', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', product : error}) )
    },


    addToCart: (req, res, next) => {
        req.session.cart == undefined? req.session.cart = [] : 0;
        let cartItem = req.session.cart.find(x => x.id == req.params.id)
        
        if (typeof cartItem == "undefined"){
            req.session.cart.push({
                id: req.params.id,
                qty: 1
            })
        } else {
            let foundIndex = req.session.cart.findIndex(x => x.id == req.params.id)
            req.session.cart[foundIndex].qty ++
        }

        res.redirect('/products/carrito')
    },

    subsFromCart: (req, res, next) => {
        let foundIndex = req.session.cart.findIndex(x => x.id == req.params.id)

        if(req.session.cart[foundIndex].qty == 1){
            res.redirect(307,'/products/cart/rm/' + req.params.id)
        } else {
            req.session.cart[foundIndex].qty --

            res.redirect('/products/carrito')
        }
    },

    rmFromCart: (req, res, next) => {
        newCart = req.session.cart.filter(i => i.id != req.params.id)

        req.session.cart = newCart

        res.redirect('/products/carrito')
    }
}

module.exports = productsController;