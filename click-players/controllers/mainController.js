let mainController = {
    
    home : (req, res) => res.render('index', { title: 'Click Players | Home', stylesheet: 'index' }),

    contacto : (req, res) => res.render('contacto', { title: 'Click Players | Contacto', stylesheet: 'contacto' })
};

module.exports = mainController;