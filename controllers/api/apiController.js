const fs = require('fs');
let db = require ('../../database/models');
const bcrypt = require('bcryptjs');


let apiController = {

    usersList: (req, res) => {
        db.Users.findAll({attributes : {exclude: ['password', 'privileges', 'avatar', 'description']}},{include: {association: 'privileges'}})
        .then (users => {
                for (let i = 0; i < users.length; i++){
                    users[i].setDataValue('endpoint', 'http://localhost:3000/api/users/' + users[i].id)
                }
            res.json({
            meta: {
                status: 200,
                count: users.length,
                url: "api/users"
                },
            data: users})})
        
        .catch(res.status(404))},

    usersProfile: (req, res) => db.Users.findByPk(req.params.id, {attributes : {exclude: ['password', 'privileges']}})
    .then(users => {
        for (let i = 0; i < users.length; i++){
            users[i].setDataValue('image', 'http://localhost:3000/api/users/' + users[i].avatar)
            }
        res.json({
        meta: {
            status: 200,
            url: "http://localhost:3000/api/users/" + req.params.id
            },
        data: users})})

    .catch(res.status(404)),

    productsList : (req, res) => {
        db.Products.findAll({include: [{association: 'Product_categories'}, {association: 'Brands'}]})
        .then (products => {
            for (let i = 0; i < products.length; i++){
                products[i].setDataValue('endpoint', 'http://localhost:3000/api/products/' + products[i].id )
                products[i].setDataValue('categories', [products[i].Brands, products[i].Product_categories])
                products[i].setDataValue('image', products[i].avatar)
            }
            res.json({
            meta: {
                status: 200,
                count: products.length,
                url: "api/products"
                },
            data: products})})
    },

    productDetail: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then (product => {
            
                res.json({
                    meta: {
                        status: 200,
                        url: "http://localhost:3000/api/products/" + req.params.id,
                        image: product.avatar,
                        },
                    data: product})
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
            req.session.user = {email: req.body.email, admin: false};
            res.status(201).end('')
        }).catch(err => res.json(err))
    },

    login: (req, res, next) => {


        db.Users.findOne({where: {
            email: req.body.email
        }}).then(result => {
            if (bcrypt.compareSync(req.body.password, result.password)) {
                let user = {email: req.body.email};

                result.privileges == 'admin'? user.admin = true : user.admin = false;

                req.session.user = user;
                req.body.remember? res.cookie('remember', req.session.user, {maxAge: 60000 * 60}) : 0;

                res.status(200).end('')
            } else {
                res.status(400).end('')
            }

        })
    }
};

module.exports = apiController;