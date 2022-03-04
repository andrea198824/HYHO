const { Router } = require('express');
const { Sequelize } = require('sequelize');
const { Admin, Category, Form, Order, Products, User } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//trae la info de db form
const getDbForm = async () => {
    return await Form.findAll({
        include: {
            model: User,
            attributes: ['id'],
        },
    })
    
}

router.get("/donate-products", async (req, res, next) => {
    try {
        const {id} = req.query;
        let bdTotal = await getDbForm(); 
        if (id) {

            let prodName = await bdTotal.filter((product) =>
            product.id.toLowerCase().includes(id.toLowerCase())
            );
            prodName.length //si hay algún nombre
                ? res.status(200).send(prodName)
                : res
                    .status(404)
                    .send({ info: "Sorry, the product you are looking for is not here." });
        } else {
            res.status(200).send(bdTotal); 
        }
    } catch (error) {
        next(error);
    }
});

router.post('/donate-form', async (req, res) => {

//   req.body = {
//     user: {
//       fullName: 'Nacho Eiis',
//       id: 1,
//     },
//     product: {
//       title: "Bicicleta",
//       price: 100,
//       weight: 21,
//       descriptions: "Bicicleta casi nueva",
//       image: "https://thumbs.dreamstime.com/z/oxidado-rojo-vintage-bicicleta-estacionado-en-el-dep%C3%B3sito-de-chatarra-viejo-retro-cruiser-listo-para-la-restauraci%C3%B3n-aparcado-214943381.jpg",
//       stock: 1,
//     }
// }



try {
const {user, product} = req.body;
const {
  title,
  price,
  weight,
  descriptions,
  image,
  stock,
} = product;

const {
  fullName,
  id,
} = user;

const formCreated = await Form.create({
  title,
  price,
  weight,
  descriptions,
  image,
  stock,
})


await User.findOrCreate({
            where: { id: id }
        }).then(el => {     
        formCreated.setUser(el[0])
}).then(() => {
  res.status(200).send(
    formCreated
  );
}).catch((err) => {
  res.send(
    err
  );
})
} catch(err){
  res.send(
    err
  );
}
})




module.exports = router;

