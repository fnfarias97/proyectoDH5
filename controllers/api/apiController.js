const fs = require('fs');
let db = require ('../../database/models');

let apiController = {

usersList: (req, res) => {
    db.Users.findAll({attributes : {exclude: ['password', 'privileges']}})
    .then (response => {
       res.json(response)})
    
.catch(res.status(404))},

usersProfile: (req, res) => db.Users.findByPk(req.params.id, {attributes : {exclude: ['password', 'privileges']}})
.then(response => res.json(response))
.catch(res.status(404)),

productsList : (req, res) => {
    db.Products.findAll()
    .then (products => res.json(products))
},

productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
    .then (product => {
        
            res.json(product)
        })

    .catch(res.status(404))
        
}
};

module.exports = apiController;