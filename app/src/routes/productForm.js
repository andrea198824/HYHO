const { Router } = require('express');
const { Category, Products } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/product/form', async (req, res, next) => {


const {fullName, price, weight, descriptions, image, stock, available, category} = body;
//console.log(req.body)
try{
    const [newProduct, created] = await Products.create({
      
      where: {
            fullName,
            price,
            weight,
            descriptions,
            image,
            stock,
            available,
      }
    });
    console.log(created);

    if(category){
      let categoryA = await Category.findOrCreated({where: {name: category}});
      await newProduct.addCategory(categoryA)
    }
    res.status(200).send(`El producto ${fullName} creado con exito`)
} catch (error) {
    next(error)
}
})


module.exports = router;