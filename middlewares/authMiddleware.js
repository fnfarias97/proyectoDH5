const path = require('path')
const fs = require('fs')
const {check, validationResult, body} = require ('express-validator');
const bcrypt = require('bcryptjs');
let db = require ('../database/models');
//const { user } = require("../database/models");

const registerValidations = () => {
    return [
      check('first_name')
          .not().isEmpty().withMessage('El nombre es obligatorio')
          .isLength({ min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),

      body('first_name').trim().escape(),

      check('last_name').not().isEmpty().withMessage('El apellido es obligatorio'),

      body('last_name').trim().escape(),

      check('email')
          .not().isEmpty().withMessage('El email es obligatorio')
          .isEmail().withMessage('El email debe tener un formato válido'),
      
      body('email').custom((value, {req}) => {
          return db.Users.count({ where: { email: value } })
          .then(count => {
              console.log("count " + count )
              if(count > 0) return Promise.reject("Usuario ya existente")
          });
      }),

      check('password')
          .not().isEmpty().withMessage('La contraseña es obligatoria')
          .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
      
      body('confirmpassword').custom((value, {req}) => value == req.body.password)
      .withMessage('La confirmación debe ser igual a la contraseña')
    ]
}

 const loginValidations = () => {
     
    return [
        check('email').not().isEmpty().withMessage('El email es obligatorio'),

        check('email').isEmail().withMessage('El email debe tener formato válido'),

        body('email').custom((value, { req }) => {
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
    ]
}

const validateLogin = (req, res, next) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
        return next()
    }
    errors = errors.mapped()

    res.render('users/ingresar', { title: 'Click Players | Ingresa a tu cuenta', stylesheet: 'forms', errors, scripts: ['https://cdnjs.cloudflare.com/ajax/libs/validator/13.5.2/validator.min.js','login'] });
}

const validateRegister = (req, res,next) => {
    let errors = validationResult(req);
    let userFilled = {...req.body}
    userFilled.password = ''
    userFilled.confirmpassword = ''

    if (errors.isEmpty()) {
        return next()
    }
    errors = errors.mapped()
    res.render('users/registrar', { title: 'Click Players | Registrate', stylesheet: 'forms', errors, userFilled, scripts: ['https://cdnjs.cloudflare.com/ajax/libs/validator/13.5.2/validator.min.js','register'] });
}

const isLogged = (req, res, next) => {
    req.session.user?
        next () : res.redirect('/auth/ingresar');
}

const isNotLogged = (req, res, next) => {
    !req.session.user?
        next () : res.redirect('/auth/perfil');
}

const isAdmin = (req, res, next) => {
    req.session.user.admin?
        next () : res.redirect('/')
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
    isAdmin,
    remember
}