const { Router } = require('express');
const { Breed, Temperament } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getApiInfo,
    apiInfoAdapter,
    getDbInfo,
    getAllInfo,
    isUUID,
    getTemperaments,
  } = require('./functions');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async (req, res) => {
  const name = req.query.name
  let info = await getAllInfo()
  if (!info) {res.status(404).send({message:"Not found"})}
  if (!name) {
    res.status(200).send(info)
  } else {
    info = info.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    res.status(200).send(info);
  }
})

router.get('/dogs/:id', async (req, res) => {
  const id = req.params.id
  let info = await getAllInfo()
  if (!isUUID(id) && isNaN(id)) {
    res.status(400).send({message:"Invalid id input"})
  } else {
    info = info.filter(el => el.id == id);
    if (info.length) {
      res.status(200).send(info)
    } else {
      res.status(404).send({message:"No id match"})
    }
    
  }
})

router.get('/temperament', async (req, res) => {
  let temperamentsArr = await getTemperaments();
  temperamentsArr.forEach(el => {
    Temperament.findOrCreate({
        where: { name: el }
    })
  });
  const allTemperaments = await Temperament.findAll();
  res.status(200).send(allTemperaments);
})

router.post('/dog', async (req, res) => {
  console.log("post")

  // const {
  //   name, 
  //   highHeight, 
  //   highWeight, 
  //   lowHeight, 
  //   lowWeight, 
  //   highLife_span, 
  //   lowLife_span, 
  //   image,
  //   temperament,
  //   origin,
  //   bred_for,
  //     } = req.body;

  const {
    name, 
    height,  
    weight,  
    life_span, 
    image,
    temperament,
    origin,
    bred_for,
      } = req.body;
console.log('name :',name)
console.log('height :',height)
console.log('weight :',weight)
console.log('life_span :',life_span)
console.log('image :',image)
console.log('temperament :',temperament)
console.log('origin :',origin)
console.log('bred_for :',bred_for)
      // let height = [lowHeight, highHeight]
      // let weight = [lowWeight, highWeight]
      // let life_span = [lowLife_span, highLife_span]
  
  if(name && height && weight) {
    const breedCreated = await Breed.create({
      name, 
      height, 
      weight, 
      life_span, 
      image,
      origin,
      bred_for,
    });
  
    if (temperament && temperament.length) {
      await Promise.all(
        temperament.map(async (el) => {
              return await Temperament.findOrCreate({
                  where: { name: el }
              })
          })
      ).then(el => {
          el.map(toAdd => {      
              breedCreated.addTemperament(toAdd[0])
          })
      }).then(() => {
        res.status(200).send(
          breedCreated
        );
      }).catch((err) => {
        res.send(
          err
        );
      })
    } else {
      res.status(200).send(
        breedCreated
      );
    }
  
    } else {
      res.status(400).send({message:"Not enougth info"});
    }

  
})



module.exports = router;

