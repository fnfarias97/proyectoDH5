let userController = {
    'ingresar' : function(req, res){
        res.render('ingresar');
    },
    'productos' : function(req, res){
        res.render('productos');
    },
    'detalle' : function(req, res){
        res.render('detalle');
    },
    'registrar' : function(req, res){
        res.render('registrar');
    },
    'contacto' : function(req, res){
        res.render('contacto');
    }
};

module.exports = userController;