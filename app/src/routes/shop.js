'use strict'

const { Cart, Order, Products, User } = require('../db')

//carrito compras

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
            attributes: [email],
            through: {
                attributes: []
            }
        }
    })
}
exports.getCart = async function (req, res, next) {
    const { email } = req.params;
    try {
        let user = await User.findAll({
            where: {
                email: email
            }
        })
        //console.log(user)
        let cart = await Cart.findAll({
            where: {
                userId: user[0].id
            }
        })
        cart.length
            ? res.status(200).send(cart)
            : res.status(404).send('Cart dont found')
    } catch (error) {
        next({ info: error })
    }
}



exports.postCart = async function (req, res, next) {
    try {
        const { cart, email } = req.body

        let user = await User.findAll({
            where: {
                email: email
            }
        })
        let cartDb = await Cart.findAll({
            where: {
                userId: user[0].id
            }
        })

        if (!cartDb[0]) {
            //console.log("No se encontro carrito")
            await Cart.create({
                    cart: JSON.stringify(cart),
                    userId: user[0].id
            })
            return res.status(201).send("Cart created succesfully")
        }

        else {
            //console.log("Se encontro carrito")
            return res.status(200).send('Cart was found and for consequence it wasnt created')
        }

    } catch (error) {
        next(error)
    }
}

exports.postCartDeleteCart = async (req, res, next) => {
    const { email } = req.body
    try {
        let user = await User.findAll({
            where: {
                email: email
            }
        })
        await Cart.destroy({
            where: {
                userId: user[0].id
            }
        })
        return res.json({ eliminado: true })
    } catch (error) {
        next(error)
    }
}

exports.putCart = async (req, res, next) => {
    const { cart, email } = req.body
    try {
        let user = await User.findAll({
            where: {
                email: email
            }
        })
        let prod = await Cart.update(
            { cart: cart },
            {
                where: {
                    userId: user[0].id
                }
            }
        )
        return res.json({ modified: true })
    } catch (error) {
        next(error)
    }
}

