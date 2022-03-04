<<<<<<< Updated upstream
=======
'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

//trae la info de db User
const getDbUser = async () => {
    return await User.findAll();    
}

exports.post = async function(req, res){
    const { fullName, email, password, billing_address, shipping_address, phone} = req.body;
    console.log(req.body)
    if (!fullName || typeof fullName !== "string") {
        res.send({info: "No fullName"});
        return
        }
    if (!email || typeof fullName !== "string") {
        res.send({info: "No email"});
        return
        }
    if (!password || typeof fullName !== "number") {
        res.send({info: "No password"});
        return
        }
    if (!billing_address || typeof fullName !== "string") {
        res.send({info: "No billing address"});
        return
        }
    if (!shipping_address || typeof fullName !== "string") {
        res.send({info: "No shipping address"});
        return
        }
    if (!phone || typeof fullName !== "number") {
        res.send({info: "No phone"});
        return
        }

    let userCreated = await User.create({
      fullName,
      email,
      password,
      billing_address,
      shipping_address,
      phone,
    })

    res.send(userCreated)

}

exports.get = async function (req, res, next){
    try {
        const {id} = req.query;
        let bdTotal = await getDbUser(); 
        console.log(bdTotal)
        if (id) {

            let prodName = await bdTotal.filter((user) =>
            user.id.toLowerCase().includes(id.toLowerCase())
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

exports.put = async function (req, res, next){
    try {
        const {
            id,
            fullName,
            email,
            password,
            billing_address,
            shipping_address,
            phone,
        } = req.query;
        let bdTotal = await getDbUser(); 
        console.log(bdTotal)
        if (id) {
            let prodName = await bdTotal.filter((user) =>
            user.id.toLowerCase().includes(id.toLowerCase())
            );
            prodName.length //si hay algún nombre
                ? res.status(200).send(prodName)
                : res
                    .status(404)
                    .send({ info: "Sorry, the product you are looking for is not here." });
        } else {
            res.status(404).send({info: "No id"}); 
        }
    } catch (error) {
        next(error);
    }
}
>>>>>>> Stashed changes
