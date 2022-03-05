'use strict'
const { Admin, Category, Form, order, Products, User } = require('../db');


const getDbInfo = async () => {
    return await Products.findAll({
        include: {
            model: Category,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },
    })
}

exports.get = async function (req, res, next) {
    try {
        const {fullName} = req.query;
        let bdTotal = await getDbInfo(); 
        if (fullName) {

            let prodName = await bdTotal.filter((product) =>
            product.fullName.toLowerCase().includes(fullName.toLowerCase())
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
};

