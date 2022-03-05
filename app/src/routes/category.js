'use strict'

const { Category, Products } = require('../db')

const getDbForm = async () => {
  return await Category.findAll({
    include: {
      model: Products,
      attributes: ['name']
    }
  })
}

exports.get = async function (req, res, next) {
  const { name } = req.query
  try {
    let cat
    if (name) {
      ;(cat = await Category.findAll({
        where: { name: name },
        include: Products
      })),
        cat.length
          ? res.status(200).send(cat)
          : res
              .status(404)
              .send('the mother fucking category doesnt exist!!!!!')
    } else {
      cat = await Category.findAll({
        include: Products
      })
      res.send(cat)
    }
  } catch (error) {
    next(error)
  }
}
