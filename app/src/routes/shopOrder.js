'use strict'

const { Cart, Order, Products, User } = require('../db')

exports.postCreateOrder = async function (req, res, next) {
  const { total, status, order, email } = req.body

  try {
    let user = await User.findAll({
      where: {
        email: email
      }
    })
    let [act, created] = await Order.findOrCreate({
      where: {
        order,
        userId: user[0].id,
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
  const { email } = req.query
  
  try {
    let user
    if (email){
      user = await User.findAll({
        where: {
          email: email
        }
      })
    }
    let order = await Order.findAll()
    if(email) order = order.fiter(e => e.email == email)
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