let mainController = {
    
    home : (req, res) => res.render('index', { title: 'Click Players | Home' }),

    contacto : (req, res) => res.render('contacto', { title: 'Click Players | Contacto' })
};

module.exports = mainController;