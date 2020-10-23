let userController = {
    
    ingresar : (req, res) => res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta' }),

    registrar : (req, res) => res.render('users/registrar', { title: 'Click Players | Registrate' })
};

module.exports = userController;