const path = require('path')
const fs = require('fs')
const {check, validationResult, body} = require ('express-validator');
const bcrypt = require('bcryptjs');
let db = require ('../database/models');
//const { user } = require("../database/models");
//const usersFilePath = path.join(__dirname, '../data/users.json');
//let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const registerValidations = () => {
    return [
        check('email')
        .isEmail()
        .withMessage('El email debe tener un formato válido'),
        body('email')
        .custom((value, {req}) => {
            
           return db.Users.count({ where: { email: value } })
            .then(count => {
                console.log("count " + count )
               if(count > 0) return Promise.reject("Usuario ya existente")
                      });
        })       
        ,
        check('password')
        .isLength({min:6})
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('confirmpassword')
        .custom((value, {req}) => value == req.body.password)
        .withMessage('La confirmación debe ser igual a la contraseña')
    ]
}

 const loginValidations = () => {
     
    return [
        body('email')
        .custom((value, { req }) => {
            return db.Users.findOne({
              where: {
                email: value,
              },
            }).then((user) => {
              if (user) {
                
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                  return Promise.reject("Contraseña o email inválidos");
                }
              } else {
                return Promise.reject('Usuario no encontrado');
              }
            });
          })
           /* .withMessage('Usuario no encontrado'),
            
       /*  body('password').custom((value) => { 
            console.log("value: " + value + " req " + mail);
            bcrypt.compareSync(value, db.Users.findOne({where: {email: req.body.email }})
        
        .then (response => response))})
            .withMessage('La contraseña no coincide') */
    ]
}

const validateLogin = (req, res, next) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        return next()
    }
    errors = errors.errors.map(e => e.msg)

    res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta', stylesheet: 'ingresar', errors: errors });
}

const validateRegister = (req, res,next) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        return next()
    }
    errors = errors.errors.map(e => e.msg)
    res.render('users/registrar', { title: 'Click Players | Registrate', stylesheet: 'registrar', errors });
}

const isLogged = (req, res, next) => {
    req.session.user?
        next () : res.redirect('/auth/ingresar');
}

const isNotLogged = (req, res, next) => {
    !req.session.user?
        next () : res.redirect('/auth/perfil');
}

const remember = (req, res, next) => {
    req.cookies.remember? req.session.user = req.cookies.remember : 0;
    res.locals.user = req.session.user;
    next();
}

module.exports =  {
    registerValidations,
    loginValidations,
    validateRegister,
    validateLogin,
    isLogged,
    isNotLogged,
    remember
}