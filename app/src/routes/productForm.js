'use strict'
const { Category, Products, Form } = require('../db');



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

exports.postArray = async function(req, res, next) {
      console.log("post")
    
      // const {
      //   name, 
      //   highHeight, 
      //   highWeight, 
      //   lowHeight, 
      //   lowWeight, 
      //   highLife_span, 
      //   lowLife_span, 
      //   image,
      //   temperament,
      //   origin,
      //   bred_for,
      //     } = req.body;
    
      const {
        formId,
        fullName, 
        price,  
        weight,  
        descriptions, 
        image,
        stock,
        category,
          } = req.body;


      let productCreated
      if(fullName  &&
        price  &&
        weight  &&
        descriptions  &&
        image  &&
        stock  &&
        category.length) {
        productCreated = await Products.create({
          fullName,
          price,
          weight,
          descriptions,
          image,
          stock,
        });
        } else {res.status(400).send({message:"Not enougth info"})}
        if (category && category.length) {
              await Promise.all(
                category.map(async (el) => {
                      return await Category.findOrCreate({
                          where: { name: el }
                      })
                  })
              ).then(el => {
                  el.map(toAdd => {      
                    productCreated.addCategory(toAdd[0])
                  })
              })
        }
        if (formId) {
                await Form.findOrCreate({
                  where: { id: formId }
              }).then(el => {
                console.log('el:', el[0])
                productCreated.setForm(el[0])
              })
        }
        if (productCreated !== {}) {
          res.status(200).send(productCreated);
        } else {
          res.status(400).send({info: "Bad request"});
        }
                  
          
    
    }


    exports.put = async function (req, res, next) {
      const {id} = req.params
      const  product  = req.body;
      try {
        let prod = await Products.update(product, {
          where: {
            id: id,
          },
          include: Category,
        });
            return res.json({modificate: true});
      } catch (error) {
        next(error);
      } 
     }

     exports.delete = async function (req, res, next) {
       const id = req.params.id;
       try {
         let prod = await Products.destroy({
           where: {
             id: id,
           },
         });
         return res.json({delete: true});
       } catch (error) {
         next(error)
       }
     }