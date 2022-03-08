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

  try {
    const {
      form,
      product
    } = req.body
    console.log("OK")

    if (!form) {
      res.send({info: "No form"});
      return
      }
    if (!product) {
        res.send({info: "No product"});
        return
        }

    const {
      formId
        } = form;

    if (!formId) {
      res.send({info: "No formId"});
      return
      }

      const {
        title, 
        price,  
        weight,  
        descriptions, 
        image,
        stock,
        category,
          } = product;

          if (!title) {
            res.send({info: "No title"});
            return
            }
          if (!price) {
            res.send({info: "No price"});
            return
            }
          if (!weight) {
            res.send({info: "No weight"});
            return
            }
          if (!descriptions) {
            res.send({info: "No descriptions"});
            return
            }
          if (!image) {
            res.send({info: "No image"});
            return
            }
          if (!stock) {
            res.send({info: "No stock"});
            return
            }
          if (!category) {
            res.send({info: "No category"});
            return
            }  
  
    let productCreated
    if(
      title  &&
      price  &&
      weight  &&
      descriptions  &&
      image  &&
      stock  &&
      category.length
      ) {
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
              productCreated.setForm(el[0])
            })
      }
      if (productCreated !== {}) {
        res.status(201).send(productCreated);
      } else {
        res.status(404).send({info: "Bad request"});
      }
  } catch (error) {
    next(error)
  }             
      

}
