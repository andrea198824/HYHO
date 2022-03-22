'use strict'
const { Cart, Order, User } = require('../db.js')
//const server = require('express').Router();
require('dotenv').config()
// SDK de Mercado Pago
const mercadopago = require('mercadopago')
const order = require('../models/order.js')

const { ACCESS_TOKEN } = process.env

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN
})

//Ruta que genera la URL de MercadoPago
exports.get = async function (req, res, next) {
  //const {id_user} = req.params
  const { email, cart } = req.body // id carrito

  let user = await User.findAll({
    where: {
      email: email
    }
  })

    //const {id_user} = req.params
    try {
      let {email, cart} = req.body // id carrito
    
    
      cart = Array.isArray(cart) ? JSON.stringify(cart) : cart;//--> SALE UN STRING
     
        let cartDb = await Cart.findAll({
            where: {
              cart: cart
            }
        })
        
        let cartId = cartDb[0].id
    
        // console.log("--------------------------------------------", cartId)
        //se respeta el formato por que asi lo pide mercadopago
    
        cart = typeof cart === 'string' ? JSON.parse(cart) : cart; //--> SALE UN ARRAY
    
    
      const items_ml = cart.map(i => ({
        title: i.title,
        unit_price: i.price,
        quantity: i.quantity,
      }))
    
      // Crea un objeto de preferencia
      let preference = {
     items: items_ml,
        external_reference : `${cartId}`,
        payment_methods: {
          excluded_payment_types: [
            {
              id: "atm"
            }
          ],
          installments: 3  //Cantidad máximo de cuotas
        },
        back_urls: {
          success: 'http://localhost:3001/mercadopago/pagos',
          failure: 'http://localhost:3001/mercadopago/pagos',
          pending: 'http://localhost:3001/mercadopago/pagos',
        },
      };
    
      mercadopago.preferences.create(preference)
    
      .then(function(response){
        console.info('respondio')
        //Este valor reemplazará el string"<%= global.id %>" en tu HTML
          global.id = response.body.id;
          console.log(response.body)
          res.json({ id: global.id });
        })
        .catch(function(error){
          console.log(error);
        })
      
    } catch (error) {
      console.log("error  :",error)
      res.sendStatus(404)
    }
  }
    

//Ruta que recibe la información del pago
exports.pagos = async function (req, res) {
  try {
    console.info("EN LA RUTA PAGOS ", req)
    const payment_id= req.query.payment_id
    const payment_status= req.query.status
    const external_reference = req.query.external_reference
    const merchant_order_id= req.query.merchant_order_id
    // const items = req.query.items
    const status = req.query.status
    //console.log("EXTERNAL REFERENCE ", external_reference)
    // console.log("item------------------------------------", items)
  
      const cart = await Cart.findAll({
          where:{
              id: external_reference
          }
      })
      console.log("---------------------------cart :",cart)
  
      
      let detail = cart[0].dataValues.cart //Array
  
      
      detail = typeof detail === 'string' ? JSON.parse(detail) : detail;
      
      console.log("---------------------------detail :",detail)
      detail = Array.isArray(detail) ? 
      detail.map(e => {
        let toReturn = {
          title: e.title,
          total: e.price * e.quantity
        }
        return toReturn
      }) : detail
  
  
      let Total = 0; //Unidad
      for (let i = 0; i < detail.length; i++) {
        Total = detail[i].total + Total
      }
      
  
    //Aquí edito el status de mi orden
    Order.create({
          payment_id: payment_id,
          payment_status: payment_status,
          merchant_order_id : merchant_order_id,
          status : status,
          userId: cart[0].userId,
          cartId: external_reference,
          total:Total,
          detail:JSON.stringify(detail),
      })
  
  
  
      return res.redirect("http://localhost:3000")
      
  //     .catch((err) =>{
  //       console.error('error al salvar', err)
  //       return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
  //     })
  //   })
  //   .catch(err =>{
  //     console.error('error al buscar', err)
  //     return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
  //   })
  
    //proceso los datos del pago 
    //redirijo de nuevo a react con mensaje de exito, falla o pendiente
 
  } catch (error) {
    console.log("error  :",error)
    res.sendStatus(404)
  }
}

//Busco información de una orden de pago
exports.pagosId = async function (req, res) {
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  console.info('Buscando el id', id)
  mp.get(`/v1/payments/search`, { status: 'pending' }) //{"external_reference":id})
    .then(resultado => {
      console.info('resultado', resultado)
      res.json({ resultado: resultado })
    })
    .catch(err => {
      console.error('No se consulto:', err)
      res.json({
        error: err
      })
    })
}

exports.getOrderUserId = async function (res, req, next) {
  const email = req.query.email

  try {
    let user = await User.findAll({
      where: {
        email: email
      }
    })
    let ord = await Order.findAll({
      where: {
        userId: user[0].id
      }
    })
    ord.length
      ? res.status(200).send(ord)
      : res.status(404).send('Order not found')
  } catch (error) {
    next(error)
  }
}
