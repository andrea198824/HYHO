"use strict";

const { Donation, User } = require("../db");

//carrito compras

exports.getDonations = async function (req, res, next) {
  const { email } = req.query; //ID del producto
  try {
    let dont = await Donation.findAll();
    if (email) {
      // let prodName = await getDbInfoById(id)
      dont.length //si hay algún nombre
        ? res.status(200).send(dont)
        : res.status(404).send({
            info: "Sorry, the donation you are looking for is not here.",
          });
    } else {
      res.status(200).send(dont);
    }
  } catch (error) {
    next(error);
  }
};

const getDb = async () => {
  return await Donation.findAll({
    include: {
      model: User,
      attributes: [email],
      through: {
        attributes: [],
      },
    },
  });
};
// exports.getDon = async function (req, res, next) {
//     const { email } = req.params;
//     try {
//         let user = await User.findAll({
//             where: {
//                 email: email
//             }
//         })
//         //console.log(user)
//         let cart = await Cart.findAll({
//             where: {
//                 userId: user[0].id
//             }
//         })
//         cart.length
//             ? res.status(200).send(cart)
//             : res.status(404).send('Cart dont found')
//     } catch (error) {
//         next({ info: error })
//     }
// }

exports.postDonation = async function (req, res, next) {
  try {
    const { donation, email } = req.body;
    console.log(req.body);
    let user = await User.findAll({
      where: {
        email: email,
      },
    });

    console.log(user);
    if (user) {
      await Donation.create({      
          value: donation,
          userId: user[0].id,        
      });
      return res.status(201).send("Donate created successfully");
    } else {
      return res
        .status(200)
        .send("User was found and for consequence it wasnt created");
    }
  } catch (error) {
    next(error);
  }
};

// exports.postCartDeleteCart = async (req, res, next) => {
//     const { email } = req.body
//     try {
//         let user = await User.findAll({
//             where: {
//                 email: email
//             }
//         })
//         await Cart.destroy({
//             where: {
//                 userId: user[0].id
//             }
//         })
//         return res.json({ eliminado: true })
//     } catch (error) {
//         next(error)
//     }
// }

// exports.putCart = async (req, res, next) => {
//     const { cart, email } = req.body
//     try {
//         let user = await User.findAll({
//             where: {
//                 email: email
//             }
//         })
//         let prod = await Cart.update(
//             { cart: cart },
//             {
//                 where: {
//                     userId: user[0].id
//                 }
//             }
//         )
//         return res.json({ modified: true })
//     } catch (error) {
//         next(error)
//     }
// }

exports.getTotalDonations = async function (req, res, next) {
  let {year, month} = req.body

  year ? year = year-1900 : year
  if(month) month = month - 1

  console.log("year :",year)
  console.log("month :",month)


  try {

    let donaciones = await Donation.findAll()
   if(year){ donaciones = donaciones.filter(el => el.createdAt.getYear() == year) }
   
   if(month && year){ donaciones = donaciones.filter(el => el.createdAt.getMonth() == month) }

   if(month && !year){res.status(404).send({info:"se necesita año"})}

    // console.log("donaciones[0].typeof--------:", typeof donaciones[0].createdAt)
    // console.log("donaciones[0].GET YEAR--------:",(donaciones[0].createdAt).getYear())
    // console.log("donaciones[0].createdAt--------:",donaciones[0].createdAt)
    // console.log("donaciones[0].cMONTH--------:",(donaciones[17].createdAt).getMonth())
    let Total2 = 0
    
    let Total = 0
    for (let i= 0; i < donaciones.length; i++) {
      Total = parseInt(donaciones[i].value) + Total
      Total2 = i
     }
     Total2 = Total2 + 1
     res.status(200).send({Total, Total2})
    } catch (error) {
      next(error)
    }
  }