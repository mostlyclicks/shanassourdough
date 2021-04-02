const experss = require('express')
const router = experss.Router()
const passport = require('passport')
const Product = require('../models/Product')



router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Product.find((err, todos) => {
            if (err) {
                res.status(500).send(err.message)
            } else {
                res.json(todos)
            }
        })
    }
);

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    Product.findById(id, (err, todo) => {
        if (err) {
            res.status(500).send(err.message)
        } else {
            res.json(todo)
        }
    })
})

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const product = new Product(req.body)
    product.save().then((product) => {
        res.json(product)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    Product.findById(id, (err, product) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (!product) {
            res.status(400).send('Product was not found')
        } else {

            if (req.body.name != undefined) {
                product.name = req.body.name
            }
            if (req.body.description != undefined) {
                product.description = req.body.description
            }
            if (req.body.price != undefined) {
                product.price = req.body.price
            }
            


            product.save().then((product) => {
                res.json(product)
            }).catch((err) => {
                res.status(500).send(err.message)
            })
        }
    })
})

module.exports = router