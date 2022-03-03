const { Router } = require('express');
const { Breed, Temperament } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {

  } = require('./functions');

const router = Router();

// Configurar los routers

router.get('/', async (req, res) => {

})

router.get('/ejemplo/:id', async (req, res) => {
  const id = req.params.id
})

module.exports = router;

