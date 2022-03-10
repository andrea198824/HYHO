const { Router } = require('express')
const { Sequelize } = require('sequelize')
const { Admin, Category, Form, Order, Products, User } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var form = require('./form')
var admin = require('./admin')
var user = require('./user')
var sessionVerification = require('./sessionVerification')
var product = require('./product')
var newsletter = require('./newsletter')
var category = require('./category')
const router = Router()

//User endpoints:
router.post('/register', user.register)
router.put('/verify-user', user.verifyUser)
router.put('/verify-admin', user.verifyAdmin)
router.post('/login', user.login)
router.post('/logout', sessionVerification.needsUser, user.logout)
router.put('/modify-user', sessionVerification.needsUser ,user.put)
router.put('/shipping-data-requirement', sessionVerification.needsUser , user.shippingDataRequirement ,user.put)
router.get('/users', sessionVerification.needsAdmin ,user.get)
// router.post('/create-user', user.post)

//Form endpoints:
router.get('/admins', sessionVerification.needsAdmin ,admin.get) 
router.post('/create-admin', sessionVerification.needsAdmin ,admin.post) 

//Form endpoints:
router.get('/donate-products', sessionVerification.needsAdmin ,form.get) 
router.post('/donate-form', sessionVerification.needsUser ,form.post) 

//Product endpoints:
router.post('/product', sessionVerification.needsAdmin ,product.post)
router.get('/products', product.get)
router.put('/product/modify/:id', sessionVerification.needsAdmin ,product.put)
router.delete('/product/delete/:id', sessionVerification.needsAdmin ,product.delete)

//Category endpoints:
router.get('/category', category.get)

//Newsletter
router.post('/newsletter', newsletter.post)
router.get('/newsletter', newsletter.get)

module.exports = router
