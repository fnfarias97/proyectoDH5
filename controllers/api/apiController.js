const fs = require('fs');
let db = require ('../../database/models');
const bcrypt = require('bcryptjs');


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
            
    },

    checkEmail: (req, res) => {
        let queryConfig = {}
        if (req.query.email) {
            queryConfig = {where: {email: req.query.email }}
        }

        db.Users.findOne(queryConfig)
        .then(result => {

            if (result) {
                res.status(200).end('')
            } else {
                res.status(404).end('')
            }
            
        })
        .catch(err => {
            res.send(err)
        })
    },

    newUser: (req, res) => {
        db.Users.create({
            first_name: req.body.first_name,
            second_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }).then(result => {
            req.session.user = req.body.email;
            res.status(201).end('')
        }).catch(err => res.json(err))
    }
};

module.exports = apiController;