const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


let userController = {
    
    ingresar : (req, res) => res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta', stylesheet: 'ingresar' }),

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/');
    },


    registrar : (req, res) => res.render('users/registrar', { title: 'Click Players | Registrate', stylesheet: 'registrar' }),

    login : (req, res, next) => {
        let user = req.body.email;

        req.session.user = user;
        req.body.remember? res.cookie('remember', req.session.user, {maxAge: 60000 * 60}) : 0;

        console.log(req.cookies.remember);

        res.redirect('/');
    },

    store : (req, res) => {

        let usuario = {
                id: users[users.length - 1].id + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
        }
        users.push(usuario);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));

        req.session.user = usuario.email;

        res.redirect('/')

    },

    perfil: (req, res) => res.render('users/perfil', {title: 'Click Players | Mi Perfil', stylesheet: 'perfil'})
};

module.exports = userController;