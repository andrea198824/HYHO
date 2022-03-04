'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

//trae la info de db form
const getDbAdmin = async () => {
    return await Admin.findAll()    
}

exports.post = async function(req, res){
    const { fullName, email, password } = req.body;
    console.log(req.body)
    if (!fullName) {
        res.send({info: "No fullName"});
        return
        }
    if (!email) {
        res.send({info: "No email"});
        return
        }
    if (!password) {
        res.send({info: "No password"});
        return
        }

    let adminCreated = await Admin.create({
      fullName,
      email,
      password,
    })

    res.send(adminCreated)

}

exports.get = async function (req, res, next){
    try {
        const {id} = req.query;
        let bdTotal = await getDbAdmin(); 
        console.log(bdTotal)
        if (id) {

            let prodName = await bdTotal.filter((admin) =>
            admin.id.toLowerCase().includes(id.toLowerCase())
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