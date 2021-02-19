const {check, validationResult, body} = require ('express-validator');
let db = require ('../database/models');


const productsMiddleware = () => {
    return [
        check('name')
            .not().isEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),

        body('name').trim().escape(),

        check('description').isLength({min: 20}).withMessage('La descripción debe tener al menos 20 caracteres'),

        check('price').isFloat().withMessage('El precio tiene que ser un número'),

        check('stock').isInt().withMessage('El stock tiene que ser un número entero'),

        body('avatar').custom((value, {req}) => {
            if (typeof req.files[0] != "undefined") {
                return true
            }
            return false
        }).withMessage('El avatar es obligatorio')

    ]
}

const validateProduct = (req, res, next) => {
    let errors = validationResult(req);
    let alreadyCompleted = { ...req.body }

    if (errors.isEmpty()) {
        return next()
    }

    errors = errors.mapped()

    db.Product_categories.findAll()
    .then(result => {
        let categories = result
        db.Brands.findAll()
            .then(brands => res.render('products/agregarProducto', { title: 'Click Players | Agregar producto', stylesheet: 'forms', categories, brands, errors, productFilled: alreadyCompleted })
        )
    })
}

module.exports =  {
    productsMiddleware,
    validateProduct
}