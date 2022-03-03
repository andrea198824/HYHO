const { Router } = require('express');
//const { } = require('../db');
const axios = require('axios');
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var postForm = require('./postForm');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//por favor realizar sus rutas aquí

router.post('/post/form', postForm.post);