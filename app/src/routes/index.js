const { Router } = require('express')
const { Sequelize } = require('sequelize')
const { Admin, Category, Form, Order, Products, User } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var form = require('./form')
var admin = require('./admin')
var user = require('./user')
var product = require('./product')

var productform = require('./productform')
var category = require('./category')
const router = Router()

//Form endpoints:
router.get('/donate-products', form.get) //Tested: Ok
router.post('/donate-form', form.post) //Tested: Ok

//Form endpoints:
router.get('/admins', admin.get) //Tested: Ok
router.post('/create-admin', admin.post) //Tested: Ok

//User endpoints:
router.get('/users', user.get)
router.post('/create-user', user.post)
router.put('/modify-user', user.put)

//Product endpoints:
router.post('/product/form', productform.post) //Tested: Ok
router.post('/product/formarray', productform.postArray)
router.get('/products', product.get)
router.put('/product/modify/:id', productform.put)
router.delete('/product/delete/:id', productform.delete)

//Category endpoints:
router.get('/category', category.get)

module.exports = router
