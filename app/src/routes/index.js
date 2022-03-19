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

//-----------------auth0-tokens---------------------
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

//user and guest token
const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-9xm6ldt3.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3001',
    issuer: 'https://dev-9xm6ldt3.us.auth0.com/',
    algorithms: ['RS256']
});


//admin token
const jwtAdminCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-9xm6ldt3.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://localhost:3001/admin',
issuer: 'https://dev-9xm6ldt3.us.auth0.com/',
algorithms: ['RS256']
});


//-----------------auth0-tokens---------------------

//--------------------test-tokens-endpoints--------------------

//Endpoint protected by guest token
router.get('/authorized', jwtCheck,function (req, res) {
    res.send('Secured Resource');
});

//Endpoint protected by admin token
router.get('/admin/authorized', jwtAdminCheck,function (req, res) {
    res.send('Secured Resource');
});

//--------------------test-tokens-endpoints--------------------


//User endpoints:
router.post('/register', jwtCheck, user.register) //Funciona con auth0 y token
router.get('/isadmin', jwtCheck, user.isadmin) //Funciona con auth0 y token
router.put('/verify-admin', jwtAdminCheck, user.verifyAdmin) //Funciona con auth0 y token
router.put('/modify-user', jwtCheck , user.put) //Funciona con auth0 y token
router.get('/users', jwtAdminCheck, user.get) //Funciona con auth0 y token
router.get('/myinfo', jwtCheck, user.myinfo) //Funciona con auth0 y token


// router.get('/login-status', user.status) //Funciona
// router.put('/verify-user', user.verifyUser) //Funciona
// router.post('/login', user.login) //Funciona
// router.post('/logout', user.logout) //Funciona
// router.put('/modify-mydata', user.modifyMyData) //Funciona
// router.put('/shipping-data-requirement',  user.shippingDataRequirement ,user.put) //Funciona
// router.post('/create-user', user.post)

//Form endpoints:
// router.get('/admins', sessionVerification.needsAdmin ,admin.get) // No va
// router.post('/create-admin', sessionVerification.needsAdmin ,admin.post) // No va

//Form endpoints:
router.get('/donate-products', jwtAdminCheck , form.get) //Funciona con auth0 y token
router.post('/donate-form', jwtCheck , form.post) //Funciona con auth0 y token

//Product endpoints:
router.post('/product', jwtAdminCheck , product.post) //Funciona
router.get('/products', product.get)
router.put('/product/modify/:id', jwtAdminCheck , product.put)
router.delete('/product/delete/:id', jwtAdminCheck , product.delete)

//Category endpoints:
router.get('/category', category.get)

//Newsletter
router.post('/newsletter', jwtAdminCheck , newsletter.post)
router.get('/newsletter', jwtAdminCheck , newsletter.get)

//--------------shopping routes --------------------

const shopController = require('./shop')

// router.get('/', shopController.getIndex);    
router.get('/shop' , jwtCheck , shopController.getProducts) //  -> Usar /products
router.get('/cart/:email', shopController.getCart)
router.post('/cart', jwtCheck , shopController.postCart)
// router.get('/checkout', shopController.getCheckout);
// router.get('/orders', shopController.getOrders);
// router.get('/products/:productId', shopController.getProduct);
router.delete('/deleteCart', jwtCheck , shopController.postCartDeleteCart)
router.put('/putCart', jwtCheck , shopController.putCart)
// router.post('/create-order', shopController.postOrder);

//---------------shopping Orders ------------------

const shopControllerOrder = require('./shopOrder')
router.delete('/deleteOrder', jwtCheck , shopControllerOrder.deleteOrder);
router.get('/getOrder', jwtCheck , shopControllerOrder.getOrder);
router.post('/create-order', jwtCheck , shopControllerOrder.postCreateOrder)

//--------------shopping routes --------------------
// router.get('/sessions', sessions.get);
// router.get('/counter', sessions.counter);




module.exports = router
