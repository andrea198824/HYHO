'use strict'

const { Cart, Order, Products, User } = require('../db')


exports.getProducts = async function (req, res, next) {
  const { id } = req.query //ID del producto
  try {
    let prod = await Products.findAll()
    if (id) {
      // let prodName = await getDbInfoById(id)
      prod.length //si hay algún nombre
        ? res.status(200).send(prod)
        : res.status(404).send({
            info: 'Sorry, the product you are looking for is not here.'
          })
    } else {
      res.status(200).send(prod)
    }
  } catch (error) {
    next(error)
  }
}


const getDb = async () => {
  
  return await Cart.findAll({
    include: {
      model: User,
      attributes: [id],
      through: {
        attributes: []
      }
    }
  })
}
exports.getCart = async function (req, res, next) {
//   const { userId } = req.query
  const { email } = req.body
  try {
    let user = await User.findAll({
      where: {
        email: email
      }
    })
    let cart = await Cart.findAll({
      where: {
        userId: user[0].id
      }
    })
    cart.length
      ? res.status(200).send(cart)
      : res.status(404).send('No se escuentra carrito')
  } catch (error) {
    next({info: error})
  }
}



exports.postCart = async function (req, res, next) {
  const { cart, email } = req.body
 
  try {
    let user = await User.findAll({
      where: {
        email: email
      }
    })
    let [act, created] = await Cart.findOrCreate({
      where: {
        cart,
        userId: user[0].id
      }
    })
    console.log(created)

    return res.status(200).send('Table and user created successfully')
  } catch (error) {
    next(error)
  }
}

exports.postCartDeleteCart = async (req, res, next) => {
  const { id } = req.body // ID del Cart
  try {
    let prod = await Cart.destroy({
      where: {
        id: id
      }
    })
    return res.json({ eliminado: true })
  } catch (error) {
    next(error)
  }
}

exports.putCart = async (req, res, next) => {
  const { cart } = req.body
  const { id } = req.params //ID del cart
  try {
    let prod = await Cart.update(
      { cart: cart },
      {
        where: {
          id: id
        }
      }
    )
    return res.json({ modified: true })
  } catch (error) {
    next(error)
  }
}

