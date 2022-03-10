'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

var CryptoJS = require("crypto-js");


//trae la info de db User
const getDbUser = async () => {
    return await User.findAll();    
}

function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

exports.register = async function(req, res, next){
    try {
            //Checks query.
            let { 
                    role,
                }
            = req.query;

            // console.log(req.query)
            
            role = role === "admin" ? role : "user";

            let {
                    fullName,
                    email,
                    password,
                    billing_address,
                    shipping_address,
                    phone
                }
            = req.body;


            // console.log(req.body)
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
            // if (!billing_address || typeof billing_address !== "string") {
            //     res.status(400).send({info: "No billing address"});
            //     return
            //     }
            // if (!shipping_address || typeof shipping_address !== "string") {
            //     res.status(400).send({info: "No shipping address"});
            //     return
            //     }
            // if (!phone || typeof phone !== "string") {
            //     res.status(400).send({info: "No phone"});
            //     return
            //     }

            let emailUser = await User.findAll({
                    where: { email: email }
                })
            
                // console.log("emailUser :",emailUser)
            if (emailUser.length) {
                res.status(400).send({info: "Mail is already taken"});
                return
            }

            const securityString = randomString(100);

            password = CryptoJS.HmacSHA1(securityString, password).toString(CryptoJS.enc.Base64)
            
            let userCreated = await User.create({
            fullName,//
            email,//
            password,//
            securityString: randomString(100),
            billing_address,//
            shipping_address,//
            phone,//
            })

            res.status(201).send(userCreated)
} catch (error) {
    next({info: error});
}

}

exports.verifyUser = async function(req, res, next) {
    
    try {
        const {
            id
        } = req.query

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
                prodName[0].set({emailVerificated: true})
                await prodName[0].save();
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({info: "No id"}); 
        }
    } catch (error) {
        next(error);
    }
}

exports.verifyAdmin = async function(req, res, next) {
    
    try {
        const {
            id
        } = req.query

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
                prodName[0].set({adminVerificated: true})
                await prodName[0].save();
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({info: "No id"}); 
        }
    } catch (error) {
        next(error);
    }
}

exports.login = async function (req, res, next){
    try {
        const {
            input,
            password,
        } = req.body

        let bdTotal = await getDbUser(); 

        let fullName = input;
        let email = input;

        // password = CryptoJS.HmacSHA1(securityString, password).toString(CryptoJS.enc.Base64)
        let userToLogin 

        if (fullName) userToLogin = await bdTotal.filter((user) =>user.fullName == fullName);
        if (email) userToLogin = await bdTotal.filter((user) =>user.email == email);

        if (!userToLogin.length) {//si no hay algún nombre
            res
            .status(404)
            .send({ info: "Sorry, theres no registered user with that email or username." });
        } else {
            let password = CryptoJS.HmacSHA1(userToLogin[0].securityString, password).toString(CryptoJS.enc.Base64)
            if (
                userToLogin[0].password == password &&
                userToLogin[0].emailVerificated
                ) {
                req.session.id = userToLogin[0].id;
                req.session.role = userToLogin[0].adminVerificated ? "admin" : "user";
                res.status(201).send({info: {
                    user: userToLogin[0],
                    session: req.session
                }})
            } else {
                if (!userToLogin[0].emailVerificated) res.status(201).send({info: "Email verification required"});
                if (userToLogin[0].password != password) res.status(201).send({info: "Password incorrect"});
            }
        }

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
        } = req.body;
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
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({info: "No id"}); 
        }
    } catch (error) {
        next(error);
    }
}
