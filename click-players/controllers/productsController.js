let products = require ('../data/productos.json');

let productsController = {
    
    products : (req, res) => res.render('products/productos', { title: 'Click Players | Productos', stylesheet: 'index' }),
    
    show: (req, res) => {
        let a = products.find((product) => {
            return product.id == req.params.id
        })

        if (a){
            res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', productNombre : a.nombre, productPrecio : a.precio, productDescription: a.descripcion, productImage : a.imagen})
        }

        res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', productNombre : 'Lo sentimos',  productPrecio : 'el producto', productDescription: 'no existe', productImage : '/images/producto-no-encontrado.png'})
    },

    agregarProducto: (req, res) => res.render('products/agregarProducto', { title: 'Click Players | Agregar producto', stylesheet: 'ingresar' }),

    editarProducto: (req, res) => {
        let a = products.find((product) => {
            return product.id == req.params.id
        })

        if (a){
            res.render('products/editarProducto', { title: 'Click Players | Modificar producto', stylesheet: 'ingresar', productNombre : a.nombre, productPrecio : a.precio, productDescription: a.descripcion, productImage : a.imagen, productMarca : a.marca, productCategoria : a.categoria})
        }

        res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle', productNombre : 'Lo sentimos',  productPrecio : 'el producto', productDescription: 'no existe', productImage : '/images/producto-no-encontrado.png'})
    },

    detalle : (req, res) => res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle' }),

    carrito : (req, res) => res.render('products/carrito', { title: 'Click Players | Carrito de productos', stylesheet: 'carrito'})
};

module.exports = productsController;