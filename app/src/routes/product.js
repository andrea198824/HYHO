'use strict'
const { Admin, Category, Form, order, Products, User } = require('../db')

function removeRepeated(arr) {
  arr = [...new Set(arr)];
  return Array.from(arr);
}

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
try {
  let {
    formId,
    title, 
    price,  
    weight,  
    descriptions, 
    image,
    stock,
    category,
      } = req.body;

  category = removeRepeated(category)


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
    if (productCreated && category && category.length) {
          await Promise.all(
            category.map(async (el) => {
                  return await Category.findOrCreate({
                      where: { name: el }
                  })
              })
          ).then(el => {
              el.map(toAdd => {      
                console.log("productCreated :",productCreated);
                console.log("toAdd[0] :",toAdd[0]);
                productCreated.addCategory(toAdd[0])
              })
          })
    }
    if (productCreated && formId) {
            await Form.findOrCreate({
              where: { id: formId }
          }).then(el => {
            console.log('el:', el[0])
            productCreated.setForm(el[0])
          }).catch(error => console.log(error))
    }
    if (productCreated !== {}) {
      res.status(200).send(productCreated);
    } else {
      res.status(400).send({info: "Bad request"});
    }
} catch (error) {
  res.status(400).send({info: error});
}
  
}


exports.put = async function (req, res, next) {
  const {id} = req.params
  const  product  = req.body;
 
  try {
     await Products.update(product,{
        where: {
          id: id
        }})
     const prod = await Products.findOne( {
          where: {
            id: id,
          },
        })     
  
    if(product.categories.length){
     
     await product.categories.forEach((el) => Category.findOrCreate
       ( {
        where: { name: el },
        attributes: ["id"]
      }))
      let cat = await  Category.findAll( {
        where: {
          name: product.categories,
        },
      }) 
      
         await cat.forEach((el) => prod.setCategories(el.id))
    }

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
