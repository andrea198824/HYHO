'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

//trae la info de db form
const getDbForm = async () => {
    return await Form.findAll({
        include: {
            model: User,
            attributes: ['id'],
        },
    })
    
}

exports.post = async function(req, res){  // lalala.post
    try {
        const {user, product} = req.body;
    if (!user) {
        res.send({info: "No user"});
        return
        }
    if (!product) {
        res.send({info: "No product"});
        return
        }


    const {
      title,
      price,
      weight,
      descriptions,
      image,
      stock,
    } = product;
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
    if (!stock) {
        res.send({info: "No stock"});
        return
        }
    
    const {
      fullName,
      id,
    } = user;
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
      res.status(200).send(
        formCreated
      );
    }).catch((err) => {
      res.send(
        err
      );
    })
    } catch (error) {
        res.send(error)
    }
     
    
}

exports.get = async function (req, res, next){
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
}

