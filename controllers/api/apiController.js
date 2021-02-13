const fs = require('fs');
let db = require ('../../database/models');
const path = require('path');
const bcrypt = require('bcryptjs');

let apiController = {

usersList: (req, res, next) => {
    db.Users.findAll({ attributes: { exclude: ['password', "privileges"] }})
    .then (response => res.json(response))
    
    .catch(res.status(404))
},

usersProfile: (req, res, next) => {
    db.Users.findByPk(req.params.id, { attributes: { exclude: ['password', "privileges"] }})
    .then(response => res.json(response))
    .catch(res.status(404))

},

productsList : (req, res, next) => {
    db.Products.findAll()
    .then (products => res.json(products))
},

productDetail: (req, res, next) => {
    db.Products.findByPk(req.params.id)
    .then (product => res.json(product))

    .catch(res.status(404))
        
}
};

module.exports = apiController;