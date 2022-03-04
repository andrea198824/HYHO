const { Router } = require('express');
const { Admin, Category, Products } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

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

router.get("/products", async (req, res, next) => {
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
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const findProduct = await getDbInfo()()
    if (id) {
        let productId = await findProduct.filter(x => x.id == id)
        productId.length ?
            res.status(200).send(productId) :
            res.status(404).send('The product is not found in the system');

    }
})