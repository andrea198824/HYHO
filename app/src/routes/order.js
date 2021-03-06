const server = require('express').Router();
const { Order , User } = require('../db');

server.post('/', (req, res, next) => {
    const { userId, orderlines, status } = req.body

    Order.create({
        userId: userId,
        status: status
    })
    .then(response => {
        Promise.all(
        orderlines.map(elem => {
            Product.findByPk( elem.id)
              .then(producto =>{
                const orderId = response.dataValues.id //nos da el id de order
                
                return Order_detail.create({
                    orderId: orderId,
                    productId: producto.id,
                    quantity: elem.quantity,
                    price: producto.price
                })
              })
                .then(secondResponse => { //nos da el arreglo creado
                    const cant = secondResponse.dataValues.quantity
                    const prodId = secondResponse.dataValues.productId
                    Product.decrement(
                        {stock: cant},
                        { where: { id: prodId } }
                    )
                })
            })
        )
        .then( _ => res.send("OK"))
        .catch(err => next(err))
    })
});
