const {check, validationResult, body} = require ('express-validator');

module.exports = 
[
    check('name').isLength().withMessage('Este campo debe ser completado'),
    check('email').isEmail().withMessage('El email debe tener un formato válido'),
    check('password').isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('confirmpassword')
]