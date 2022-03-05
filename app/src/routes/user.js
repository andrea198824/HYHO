'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

//trae la info de db User
const getDbUser = async () => {
    return await User.findAll();    
}

exports.post = async function(req, res){
    try {
    const { fullName, email, password, billing_address, shipping_address, phone} = req.body;
    console.log(req.body)
    if (!fullName || typeof fullName !== "string") {
        res.send({info: "No fullName"});
        return
        }
    if (!email || typeof email !== "string") {
        res.status(400).send({info: "No email"});
        return
        }
    if (!password || typeof password !== "string") {
        res.status(400).send({info: "No password"});
        return
        }
    if (!billing_address || typeof billing_address !== "string") {
        res.status(400).send({info: "No billing address"});
        return
        }
    if (!shipping_address || typeof shipping_address !== "string") {
        res.status(400).send({info: "No shipping address"});
        return
        }
    if (!phone || typeof phone !== "number") {
        res.status(400).send({info: "No phone"});
        return
        }

    let emailUser = await User.findAll({
            where: { email: email }
        })
    
        // console.log("emailUser :",emailUser)
    if (emailUser.length) {
        res.status(400).send({info: "Mail is already taken"});
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
} catch (error) {
    next(error);
}

}

exports.get = async function (req, res, next){
    try {
        const {id} = req.query;
        let bdTotal = await getDbUser(); 
        // console.log(bdTotal)
        if (id) {

            let prodName = await bdTotal.filter((user) =>
            user.id == id
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
            user.id == id
            );
            if (!prodName.length) {//si no hay algún nombre
                res
                .status(404)
                .send({ info: "Sorry, the product you are looking for is not here." });
            } else {                
                if (fullName) prodName[0].set({fullName})
                if (email) prodName[0].set({email})
                if (password) prodName[0].set({password})
                if (billing_address) prodName[0].set({billing_address})
                if (shipping_address) prodName[0].set({shipping_address})
                if (phone) prodName[0].set({phone})
                await prodName[0].save();
                res.send(prodName[0])
            }
        } else {
            res.status(404).send({info: "No id"}); 
        }
    } catch (error) {
        next(error);
    }
}

