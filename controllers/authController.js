const fs = require('fs');
const path = require('path');
const {check, validationResult, body} = require ('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


let userController = {
    
    ingresar : (req, res) => res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta', stylesheet: 'ingresar' }),

    registrar : (req, res) => res.render('users/registrar', { title: 'Click Players | Registrate', stylesheet: 'registrar' }),

    login : (req, res) => {

        let usuario = users.find(item => item.email == req.body.email && item.password == req.body.password);

        if (usuario){
            req.session.userLogeedIn = usuario;
            if(req.body.remember != undefined){res.cookie('remember', req.session.userLogeedIn.email, {maxAge: 60000 * 60})}
            res.render('users/home', { title: 'Click Players | Home', stylesheet: 'index', user: req.body.email});
        }else{
            res.render('users/mensaje', { title: 'Usuario no encontrado', stylesheet: 'index'});
        }
    },

    store : (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()){

		let usuario = {
            id: users[users.length - 1].id + 1,
            ...req.body
            // nombre: req.body.nombre,
			// email: req.body.email,
			// contraseña: req.body.password,
		}

        users.push(usuario);

		fs.writeFileSync(usersFilePath, JSON.stringify(users, null,4));

        res.render('users/home', { title: 'Click Players | Home', stylesheet: 'index', user: req.body.name});
    }
    else {
        res.send('error');
    }

    req.session.userLogeedIn = usuario;

    }
};

module.exports = userController;