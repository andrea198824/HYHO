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
var sessions = require('./sessions')
const router = Router()

//User endpoints:
router.post('/register', user.register) //Funciona
router.put('/verify-user', user.verifyUser) //Funciona
router.put('/verify-admin', user.verifyAdmin) //Funciona
router.post('/login', user.login) //Funciona
router.post('/logout', sessionVerification.needsUser, user.logout) //Funciona
router.put('/modify-user', sessionVerification.needsAdmin ,user.put) //Funciona
router.put('/modify-mydata', sessionVerification.needsUser ,user.modifyMyData) //Funciona
router.put('/shipping-data-requirement', sessionVerification.needsUser , user.shippingDataRequirement ,user.put) //Funciona
router.get('/users', sessionVerification.needsAdmin ,user.get) // Funciona
router.get('/myinfo', sessionVerification.needsUser ,user.myinfo) // Funciona
// router.post('/create-user', user.post)

//Form endpoints:
// router.get('/admins', sessionVerification.needsAdmin ,admin.get) // No va
// router.post('/create-admin', sessionVerification.needsAdmin ,admin.post) // No va

//Form endpoints:
router.get('/donate-products', sessionVerification.needsAdmin ,form.get) //Funciona
router.post('/donate-form', sessionVerification.needsUser ,form.post) //Funciona

//Product endpoints:
router.post('/product', sessionVerification.needsAdmin ,product.post) //Funciona
router.get('/products', product.get)
router.put('/product/modify/:id', sessionVerification.needsAdmin ,product.put)
router.delete('/product/delete/:id', sessionVerification.needsAdmin ,product.delete)

//Category endpoints:
router.get('/category', category.get)

//Newsletter
router.post('/newsletter', newsletter.post)
router.get('/newsletter', newsletter.get)

//--------------shopping routes --------------------

const shopController = require('./shop')

// router.get('/', shopController.getIndex);
// router.get('/shop' ,shopController.getProducts) //  -> Usar /products
router.get('/cart', sessionVerification.needsUser ,shopController.getCart)
router.post('/cart', sessionVerification.needsUser ,shopController.postCart)
// router.get('/checkout', shopController.getCheckout);
// router.get('/orders', shopController.getOrders);
// router.get('/products/:productId', shopController.getProduct);
router.delete('/cart-delete', sessionVerification.needsUser ,shopController.postCartDeleteCart)
router.put('/putCart/:id', sessionVerification.needsUser ,shopController.putCart)
// router.post('/create-order', shopController.postOrder);

//--------------shopping routes --------------------
router.get('/sessions', sessions.get);




module.exports = router
