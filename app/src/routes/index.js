const { Router } = require('express');
const { Sequelize } = require('sequelize');
const { Admin, Category, Form, Order, Products, User } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var form = require('./form');

const router = Router();


//Form endpoints:
router.get("/donate-products", form.get); //Tested: Ok
router.post('/donate-form', form.post); //Tested: Ok




module.exports = router;

