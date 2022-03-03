const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const axios = require('axios');
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//por favor realizar sus rutas aquí