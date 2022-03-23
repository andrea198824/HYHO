"use strict";
const { Donation, User } = require("../db.js");
//const server = require('express').Router();
require("dotenv").config();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const order = require("../models/order.js");

const { ACCESS_TOKEN } = process.env;

//Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

//Ruta que genera la URL de MercadoPago
exports.get = async function (req, res, next) {
  try {
    //const {id_user} = req.params
    const { email, donation } = req.body; // id carrito

    console.log(req.body);

    const donationDB = [{ title: "donation", price: donation, quantity: 1 }];

    //se respeta el formato por que asi lo pide mercadopago
    const items_ml = donationDB.map((i) => ({
      title: i.title,
      unit_price: i.price,
      quantity: i.quantity,
    }));


    let dondb = await Donation.create({
      value: donation,
      email: email
    })

    let donId = await dondb.id

    console.log(donId)
    // Crea un objeto de preferencia
    let preference = {
      items: items_ml,
      external_reference: `${donId}`,
      payment_methods: {
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
        installments: 3, //Cantidad máximo de cuotas
      },
      back_urls: {
        success: "http://localhost:3001/mercadopago-donation/pagosDonation",
        failure: "http://localhost:3001/mercadopago-donation/pagosDonation",
        pending: "http://localhost:3001/mercadopago-donation/pagosDonation",
      },
      auto_return: "approved",
    };
    console.log(preference)
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.info("respondio");
        global.id = response.body.id;
        //global.url = response.body.sandbox_init_point;
        global.init_point = response.body.sandbox_init_point;
        //console.log(response.body);
        res.json({ id: global.id, url: global.init_point });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log("error  :", error);
    res.sendStatus(404);
  }
};

//Ruta que recibe la información del pago
exports.pagosDonation = async function (req, res) {
  // console.log(req);

  // res.json({
	// 	Payment: req.query.payment_id,
	// 	Status: req.query.status,
	// 	MerchantOrder: req.query.merchant_order_id
	// });
  
  // mercadoPago.get_credentials(code, function(error, resp){
  //   //envia req e a resposta para gravar a sessao
  //   Login.generateSession(req, resp);
  //           res.redirect("/collector/payments");
  //     });

  //console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  const preference_id = req.query.preference_id
  
  console.log("--------------------------------------", preference_id)

  const donID = await Donation.findAll({
    where:{
        id: external_reference
    }
})
  Donation.findByPk(external_reference)
  .then((order) => {
  order.payment_id= payment_id
  order.payment_status= payment_status
  order.merchant_order_id = merchant_order_id
  console.info('Salvando order')
  order.save()
  .then((_) => {
    console.info('redirect success')
  return res.redirect("http://localhost:3000")
})
.catch((err) =>{
  console.error('error al salvar', err)
  return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
})
})
.catch(err =>{
console.error('error al buscar', err)
return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
})

//proceso los datos del pago 
//redirijo de nuevo a react con mensaje de exito, falla o pendiente
}

  //return res.redirect("http://localhost:3001")




// exports.pagosId = async function (req, res, next) {
//   //   const mp = new mercadopago(ACCESS_TOKEN)
//      const id = req.params.id
//      try {

//       let ord = await Order.findAll({
//         where: {
//           id: Number(id)
//         }
//       })
//       ord.length
//         ? res.status(200).send(ord)
//         : res.status(404).send('Order not found')
//     } catch (error) {
//       next(error)
//     }
//   }
