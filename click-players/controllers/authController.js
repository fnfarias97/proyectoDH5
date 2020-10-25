let userController = {
    
    ingresar : (req, res) => res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta', stylesheet: 'ingresar' }),

    registrar : (req, res) => res.render('users/registrar', { title: 'Click Players | Registrate', stylesheet: 'registrar' })
};

module.exports = userController;