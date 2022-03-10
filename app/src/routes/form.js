'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

//trae la info de db form
const getDbForm = async () => {
    return await Form.findAll()
    
}

exports.post = async function(req, res){  // lalala.post
    try {
        let {
            title,
            price,
            weight,
            descriptions,
            image,
            stock,
          } = req.body;

    if (!title) {
        res.send({info: "No title"});
        return
        }
    if (!price) {
        res.send({info: "No price"});
        return
        }
    if (!weight) {
        res.send({info: "No weight"});
        return
        }
    if (!descriptions) {
        res.send({info: "No descriptions"});
        return
        }
    if (!image) {
        res.send({info: "No image"});
        return
        }
        
    stock = stock ? stock : 1;
    
    let id = req.session.userId

    if (!id) {
        res.send({info: "No id"});
        return
        }
    
    const formCreated = await Form.create({
      title,
      price,
      weight,
      descriptions,
      image,
      stock,
    })
    
    
    await User.findAll({
                where: { id: id }
            }).then(el => {
            // console.log('el:', el[0])
            formCreated.setUser(el[0])
    }).then(() => {
      res.status(201).send(
        formCreated
      );
    }).catch((err) => {
      res.send(
        err
      );
    })
    } catch (error) {
        res.status(404).send(error)
    }
     
    
}

exports.get = async function (req, res, next){
    try {
        const {id} = req.query;
        // let bdTotal = await getDbForm(); 
        // console.log("id :",id)
        // console.log("bdTotal    :",bdTotal)
        if (id) {
            let prodName = await bdTotal.filter((form) =>
            {
                return form.dataValues.id == id
            }

            );
            prodName.length //si hay algún nombre
                ? res.status(200).send(prodName)
                : res
                    .status(404)
                    .send({ info: "Sorry, the form you are looking for is not here." });
        } else {
            res.status(200).send(bdTotal);
        }
    } catch (error) {
        next(error);
    }
}

