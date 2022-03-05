'use strict'
const { Category, Products } = require('../db');

exports.put = async function (req, res, next) {
    const {id} = req.params;
    const {product} = req.body;
    
    try {
      await Products.update(product, {
        where: {
          id: id,
        }
      });
      return res.json({modificado: true})
    } catch (error) {
      next(error)
    }
  }