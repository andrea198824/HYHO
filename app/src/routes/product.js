'use strict'
const { Admin, Category, Form, order, Products, User } = require('../db')

const getDbInfo = async () => {
  return await Products.findAll({
    include: {
      model: Category,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
}

const getDbInfoById = async (id) => {
  return await Products.findAll({
    where: {
      id: id
    },
    include: {
      model: Category,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
}

exports.get = async function (req, res, next) {
  try {
    const { id } = req.query
    let bdTotal = await getDbInfo()
    if (id) {
      let prodName = await getDbInfoById(id)
      prodName.length //si hay algún nombre
        ? res.status(200).send(prodName)
        : res
            .status(404)
            .send({
              info: 'Sorry, the product you are looking for is not here.'
            })
    } else {
      res.status(200).send(bdTotal)
    }
  } catch (error) {
    next(error)
  }
}


exports.post = async function(req, res, next) {
  console.log("post")

  const {
    formId,
    title, 
    price,  
    weight,  
    descriptions, 
    image,
    stock,
    category,
      } = req.body;


  let productCreated
  if(title  &&
    price  &&
    weight  &&
    descriptions  &&
    image  &&
    stock  &&
    category.length) {
    productCreated = await Products.create({
      title,
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
