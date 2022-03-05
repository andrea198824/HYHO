'use strict'
const { Category, Products } = require('../db');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
exports.post = async function(req, res, next) {

  const {fullName, price, weight, descriptions, image, stock, avaliable, category} = req.body;
  
  try {
      const newCategory = await Category.findOrCreate({
        
        where: {
          name: category
        },
      });
      
  
      if(fullName, price, weight, descriptions, image, stock){
        await Products.create({
          fullName,
          price,
          weight,
          descriptions,
          image,
          stock,
          avaliable,
        });
       
      }
      res.status(200).send(`El producto ${fullName} creado con exito`)
  } catch (error) {
      next(error)
  }
  }


