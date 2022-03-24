const { Router } = require('express')
const { Sequelize } = require('sequelize')
const { Admin, Category, Form, Order, Products, User, Donation } = require('../db')
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


const logger =  (req, res, next) => {
    console.log("loogger")
    next()
}
//--------------------users-endpoints----------------------------------------
//User endpoints:
router.post('/register', jwtCheck, user.register) //Funciona con auth0 y token
router.post('/admin/register', jwtAdminCheck, user.register) //Funciona con auth0 y token

router.get('/isadmin', jwtCheck, user.isadmin) //Funciona con auth0 y token
router.get('/admin/isadmin', jwtAdminCheck, user.isadmin) //Funciona con auth0 y token

router.put('/admin/verify-admin', jwtAdminCheck, user.verifyAdmin) //Funciona con auth0 y token

router.put('/modify-user', jwtCheck , user.put) //Funciona con auth0 y token
router.put('/admin/modify-user', jwtAdminCheck , user.put) //Funciona con auth0 y token

router.get('/admin/users', logger ,jwtAdminCheck, user.get) //Funciona con auth0 y token

router.get('/myinfo', jwtCheck, user.myinfo) //Funciona con auth0 y token
router.get('/admin/myinfo', jwtAdminCheck, user.myinfo) //Funciona con auth0 y token

//--------------------users-endpoints----------------------------------------

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

//--------------------form-endpoints----------------------------------------

//Form endpoints:
router.get('/admin/donate-products', jwtAdminCheck , form.get) //Funciona con auth0 y token

router.post('/donate-form', jwtCheck , form.post) //Funciona con auth0 y token
router.post('/admin/donate-form', jwtAdminCheck , form.post) //Funciona con auth0 y token

//--------------------form-endpoints----------------------------------------



//--------------------products-endpoints----------------------------------------

//Product endpoints:
router.post('/admin/product', jwtAdminCheck, product.post) //Funciona

router.get('/products', product.get)
router.get('/admin/products', product.get)

router.put('/admin/product/modify/:id', jwtAdminCheck , product.put)
router.delete('/admin/product/delete/:id', jwtAdminCheck , product.delete)

//--------------------products-endpoints----------------------------------------

//--------------------category-endpoints----------------------------------------
//Category endpoints:
router.get('/category', category.get)
router.get('/admin/category', category.get)

//Newsletter
router.post('/newsletter', jwtCheck , newsletter.post)
router.post('/admin/newsletter', jwtAdminCheck , newsletter.post)

router.get('/admin/newsletter', jwtAdminCheck , newsletter.get)
//--------------------category-endpoints----------------------------------------

//--------------shopping routes --------------------

const shopController = require('./shop')

router.get('/shop' , jwtCheck , shopController.getProducts) 
router.get('/admin/shop' , jwtAdminCheck , shopController.getProducts) 

router.get('/cart/:email', jwtCheck, shopController.getCart) 
router.get('/admin/cart/:email', jwtAdminCheck, shopController.getCart) 

router.post('/cart', jwtCheck , shopController.postCart) 
router.post('/admin/cart', jwtAdminCheck , shopController.postCart) 

router.delete('/deleteCart', jwtCheck , shopController.postCartDeleteCart)
router.delete('/admin/deleteCart', jwtAdminCheck , shopController.postCartDeleteCart)

router.put('/putCart', jwtCheck , shopController.putCart)
router.put('/admin/putCart', jwtAdminCheck , shopController.putCart)



//---------------shopping Orders ------------------

const shopControllerOrder = require('./shopOrder')
router.delete('/deleteOrder', jwtCheck , shopControllerOrder.deleteOrder);
router.delete('/admin/deleteOrder', jwtAdminCheck , shopControllerOrder.deleteOrder);

router.get('/getOrder', jwtCheck , shopControllerOrder.getOrder);
router.get('/admin/getOrder', jwtAdminCheck , shopControllerOrder.getOrder);

router.post('/create-order', jwtCheck , shopControllerOrder.postCreateOrder)
router.post('/admin/create-order', jwtAdminCheck , shopControllerOrder.postCreateOrder)


//--------------shopping routes --------------------
// router.get('/sessions', sessions.get);
// router.get('/counter', sessions.counter);

var getPayment = require('./mercadopago')
router.post('/mercadopago', jwtCheck , getPayment.get)
router.get('/mercadopago/pagos', getPayment.pagos)

router.get('/mercadopago/pagos/:id', jwtCheck , getPayment.pagosId)
router.get('/admin/mercadopago/pagos/:id', jwtAdminCheck , getPayment.pagosId)

router.get('/mercadopago/OrderUser', jwtCheck , getPayment.getOrderUser)
router.get('/admin/mercadopago/OrderUser', jwtAdminCheck , getPayment.getOrderUser)


router.post('/mercadopago/totalVentas', jwtCheck , getPayment.getTotalVentas)
router.post('/admin/mercadopago/totalVentas', jwtAdminCheck , getPayment.getTotalVentas)

//--------------donation money------------------

// var donation = require('./donation')
// router.post('/donation', jwtCheck , donation.postDonation)
// router.get('/donationInfo', jwtCheck , donation.getDonations)
// router.get('/admin/donationInfo', jwtAdminCheck , donation.getDonations)

//--------------donation MERCADOPAGO------------------.
var donation = require('./donation')
router.post('/donation', jwtCheck , donation.postDonation)

router.get('/donationInfo', jwtCheck , donation.getDonations)
router.get('/admin/donationInfo', jwtAdminCheck , donation.getDonations)

router.post('/totalDonation', jwtCheck , donation.getTotalDonations)
router.post('/admin/totalDonation', jwtAdminCheck , donation.getTotalDonations)

var donationMp = require('./mercadoPD')
router.post('/mercadopago-donation', donationMp.get)
router.get('/mercadopago-donation/pagosDonation', donationMp.pagosDonation)

module.exports = router
