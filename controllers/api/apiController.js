const fs = require('fs');
let db = require ('../../database/models');
const path = require('path');
const bcrypt = require('bcryptjs');

let apiController = {

usersList: (req, res, next) => {
    db.Users.findAll()
    .then (response => {
        res.send(response)})
    
.catch(res.send('error'))},

usersProfile: (req, res) => db.Users.findOne({where: {first_name: req.body.first_name}}).then(res => res.json(res)),

productsList : (req, res, next) => {
    db.Products.findAll()
    .then (products => res.json(products))},

    productDetail: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then (product => {
            if (db != undefined){
                res.json(product)
            }})

        .catch(res.send('error'))
        
    },
};

module.exports = apiController;