let productsController = {
    
    products : (req, res) => res.render('products/productos', { title: 'Click Players | Productos', stylesheet: 'index' }),

    detalle : (req, res) => res.render('products/detalle', { title: 'Click Players | Detalle del producto', stylesheet: 'detalle' }),

    carrito : (req, res) => res.render('products/carrito', { title: 'Click Players | Carrito de productos', stylesheet: 'carrito'})
};

module.exports = productsController;