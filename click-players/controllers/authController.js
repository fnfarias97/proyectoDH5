let userController = {
    
    ingresar : (req, res) => res.render('ingresar', { title: 'Click Players | Ingresa a tu cuenta' }),

    registrar : (req, res) => res.render('registrar', { title: 'Click Players | Registrate' })
};

module.exports = userController;