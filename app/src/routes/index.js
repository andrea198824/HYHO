const { Router } = require('express');
const { Admin, Category, Form, Order, Products, User } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/form/post', async (req, res) => {

  body = {
    user: {
      fullName: 'Nacho Eiis',
      id: 1,
    },
    product: {
      title: "Bicicleta",
      price: 100,
      weight: 21,
      descriptions: "Bicicleta casi nueva",
      image: "https://thumbs.dreamstime.com/z/oxidado-rojo-vintage-bicicleta-estacionado-en-el-dep%C3%B3sito-de-chatarra-viejo-retro-cruiser-listo-para-la-restauraci%C3%B3n-aparcado-214943381.jpg",
      stock: 1,
    }
}

const {user, product} = body;
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
});

await User.findOrCreate({
            where: { id: id }
        }).then(el => {     
        formCreated.addUser(el[0])
}).then(() => {
  res.status(200).send(
    formCreated
  );
}).catch((err) => {
  res.send(
    err
  );
})
})




module.exports = router;

