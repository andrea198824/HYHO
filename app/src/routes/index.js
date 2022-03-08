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

//User endpoints:
router.post('/create-user', user.post)
router.put('/modify-user', user.put)
router.get('/users', user.get)

//Form endpoints:
router.get('/admins', admin.get) 
router.post('/create-admin', admin.post) 

//Form endpoints:
router.get('/donate-products', form.get) 
router.post('/donate-form', form.post) 

//Product endpoints:
router.post('/product/form', productform.post) 
router.post('/create-product', product.post)
router.get('/products', product.get)

//Category endpoints:
router.get('/category', category.get)

module.exports = router
