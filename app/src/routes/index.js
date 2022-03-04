const { Router } = require('express');
const { Sequelize } = require('sequelize');
const { Admin, Category, Form, Order, Products, User } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var form = require('./form');
var admin = require('./admin');

const router = Router();


//Form endpoints:
router.get("/donate-products", form.get); //Tested: Ok
router.post('/donate-form', form.post); //Tested: Ok

//Form endpoints:
router.get("/admins", admin.get); //Tested: Ok
router.post('/create-admin', admin.post); //Tested: Ok




module.exports = router;

