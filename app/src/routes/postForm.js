'use strict'

const { productForm, User } = require('../db');

exports.post = function(
    // req, 
    res
    ){
    //Creo un req.body para simular el original.
  req.body = {
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

  const formCreated = await productForm.create({
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


};
