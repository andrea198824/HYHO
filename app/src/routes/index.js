const { Router } = require('express');
const { Sequelize } = require('sequelize');
const { Admin, Category, Form, Order, Products, User } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var form = require('./form');
var admin = require('./admin');
var user = require('./user');

const router = Router();


//Form endpoints:
router.get("/donate-products", form.get); //Tested: Ok
router.post('/donate-form', form.post); //Tested: Ok

//Form endpoints:
router.get("/admins", admin.get); //Tested: Ok
router.post('/create-admin', admin.post); //Tested: Ok

//User endpoints:
router.get("/users", user.get);
router.post('/create-user', user.post);
router.put('/modify-user', user.put);



module.exports = router;

