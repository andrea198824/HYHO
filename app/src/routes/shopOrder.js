'use strict'

const { Cart, Order, Products, User } = require('../db')

exports.postCreateOrder = async function (req, res, next) {
  const { total, status, order, userId } = req.body

  try {
    let [act, created] = await Order.findOrCreate({
      where: {
        order,
        userId,
        total,
        status
      }
    })
    console.log(created)

    return res.status(200).send('Table and user created successfully')
  } catch (error) {
    next(error)
  }
}

exports.getOrder = async function (req, res, next) {
  const { userId } = req.query
  try {
    let order = await Order.findAll({
      where: {
        userId: userId
      }
    })
    order.length
      ? res.status(200).send(order)
      : res.status(404).send('Cannot find order')
  } catch (error) {
    next(error)
  }
}

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.body
  try {
    let prod = await Order.destroy({
      where: {
        id: id
      }
    })
    return res.json({ eliminado: true })
  } catch (error) {
    next(error)
  }
}
