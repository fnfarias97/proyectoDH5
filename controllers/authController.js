const fs = require('fs');
let db = require ('../database/models');
// const path = require('path');
const bcrypt = require('bcryptjs');

// const usersFilePath = path.join(__dirname, '../data/users.json');
// var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


let userController = {
    
    ingresar : (req, res) => res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta', stylesheet: 'forms', scripts: ['https://cdnjs.cloudflare.com/ajax/libs/validator/13.5.2/validator.min.js','login'] }),

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('remember');
        res.redirect('/');
    },


    registrar : (req, res) => res.render('users/registrar', { title: 'Click Players | Registrate', stylesheet: 'forms', scripts: ['https://cdnjs.cloudflare.com/ajax/libs/validator/13.5.2/validator.min.js','register']}),

    login : (req, res, next) => {
        let user = {email: req.body.email};
        res.privileges == 'admin'? user.admin = true : user.admin = false;
        req.session.user = user;
        req.body.remember? res.cookie('remember', req.session.user, {maxAge: 60000 * 60}) : 0;

        // console.log(req.cookies.remember);

        res.redirect('/');
    },

    store : (req, res) => {

        let usuario = {
                first_name: req.body.first_name,
                second_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
        }
        db.Users.create(usuario)
        req.session.user = usuario.email;

        res.redirect('/')

    },

    perfil: (req, res) => res.render('users/perfil', {title: 'Click Players | Mi Perfil', stylesheet: 'perfil'}),


    showProfile: (req, res) => {
        db.Users.findOne({
            where: {email: req.session.email}
            
        })
        .then (user => {

            res.render('users/perfil', {title: 'Click Players | Mi Perfil', stylesheet: 'perfil', user : user})
        })
    },

    editProfile: (req, res) => {
        db.Users.findOne({
            where: {email: req.session.email}
            
        })
            .then(user => {

                res.render('users/perfil', {title: 'Click Players | Mi Perfil', stylesheet: 'perfil', user : user})
            })

    },

    update : (req, res, next) => {
        let Users = {...req.body}
        req.files[0] != undefined ? user.avatar = req.files[0].filename : 0;
        
        db.Users.update(user, {where: {mail: req.session.email}})
        res.redirect('/')
    }

};

module.exports = userController;