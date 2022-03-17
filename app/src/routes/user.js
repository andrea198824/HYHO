'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

const session = require('express-session');

var CryptoJS = require("crypto-js");
const { put } = require('.');


//trae la info de db User
const getDbUser = async () => {
    return await User.findAll();
}

function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

exports.status = async function (req, res, next) {
    const { userId } = req.session;
    if (req.session.userId) {
        const { userId } = req.session;
        res.status(200).send({ info: `User ${userId} already logged in` })
    } else {
        res.status(400).send({ info: `No user logged in` })
    }
}



exports.register = async function (req, res, next) {
    try {
        //Checks query.
        let {
            user,
        }
            = req.body;

        let {
            email,
            email_verified,
            nickname,
            picture,
            given_name,
            family_name,
        } = user;

        let emailUser = await User.findAll({
            where: { email: email }
        })

        if (emailUser.length) {
            res.status(400).send({ info: "Mail is already taken" });
            return
        }

        let userCreated = await User.create({
            email,
            email_verified,
            nickname,
            picture,
            given_name,
            family_name,
        });
        res.status(201).send(userCreated)
    } catch (error) {
        next({ info: error });
    }

}

exports.isadmin = async function (req, res, next) {
    try {
        let {
            user,
        }
            = req.body;

        let {
            email,
        } = user;

        let emailUser = await User.findAll({
            where: { email: email }
        })
        if (emailUser.length) res.status(200).send({info: emailUser[0].admin_verified})
        if (!emailUser.length) res.status(401).send({info: "User is not in the database"})
    } catch (error) {
        res.status(404).send({info: error})
    }
}

exports.ismailautenticated = async function (req, res, next) {
    try {
        let {
            user,
        }
            = req.body;

        let {
            email,
        } = user;

        let emailUser = await User.findAll({
            where: { email: email }
        })
        if (emailUser.length) res.status(200).send({info: emailUser[0].email_verified})
        if (!emailUser.length) res.status(401).send({info: "User is not in the database"})
    } catch (error) {
        res.status(404).send({info: error})
    }
}



exports.verifyUser = async function (req, res, next) {


    try {
        const {
            id
        } = req.query

        let bdTotal = await getDbUser();
        // console.log(bdTotal)
        if (id) {
            let prodName = await bdTotal.filter((user) =>
                user.id == id
            );
            if (!prodName.length) {//si no hay algún nombre
                res
                    .status(404)
                    .send({ info: "Sorry, the product you are looking for is not here." });
            } else {
                prodName[0].set({ emailVerificated: true })
                await prodName[0].save();
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({ info: "No id" });
        }
    } catch (error) {
        next(error);
    }
}

exports.verifyAdmin = async function (req, res, next) {

    try {
        const {
            id
        } = req.query

        let bdTotal = await getDbUser();
        // console.log(bdTotal)
        if (id) {
            let prodName = await bdTotal.filter((user) =>
                user.id == id
            );
            if (!prodName.length) {//si no hay algún nombre
                res
                    .status(404)
                    .send({ info: "Sorry, the product you are looking for is not here." });
            } else {
                prodName[0].set({ adminVerificated: true })
                await prodName[0].save();
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({ info: "No id" });
        }
    } catch (error) {
        next(error);
    }
}

exports.login = async function (req, res, next) {
    try {
        let {
            input,
            password,
        } = req.body

        let bdTotal = await getDbUser();
        // console.log("bdTotal[0]     :",bdTotal[0])

        let fullName = input;
        let email = input;

        // password = CryptoJS.HmacSHA1(securityString, password).toString(CryptoJS.enc.Base64)
        let userToLogin
        let userToLoginByEmail
        let userToLoginByFullName

        if (fullName) userToLoginByFullName = await bdTotal.filter((user) => user.dataValues.fullName == fullName);
        if (email) userToLoginByEmail = await bdTotal.filter((user) => user.dataValues.email == email);

        userToLogin = userToLoginByFullName.length ? userToLoginByFullName : userToLoginByEmail;

        if (!userToLogin.length) {//si no hay algún nombre
            res
                .status(404)
                .send({ info: "Sorry, theres no registered user with that email or username." });
        } else {
            console.log("userToLogin[0].securityString   :", userToLogin[0].securityString)
            console.log("password   :", password)
            password = CryptoJS.HmacSHA1(userToLogin[0].securityString, password).toString(CryptoJS.enc.Base64)
            console.log("Input password :", password);
            console.log("Database password :", userToLogin[0].password);
            console.log("userToLogin[0].emailVerificated :", userToLogin[0].emailVerificated);
            if (
                userToLogin[0].password == password &&
                userToLogin[0].emailVerificated
            ) {
                req.session.userId = userToLogin[0].id;
                req.session.name = userToLogin[0].adminVerificated ? "admin" : "user";
                console.log(req.session)
                res.status(201).send({
                    info: {
                        user: userToLogin[0],
                        session: req.session
                    }
                })
            } else {
                if (!userToLogin[0].emailVerificated) res.status(401).send({ info: "Email verification required" });
                if (userToLogin[0].password != password) res.status(401).send({ info: "Password incorrect" });
            }
        }

    } catch (error) {
        next({ info: error });
    }
}

exports.get = async function (req, res, next) {
    try {
        const { id } = req.query;
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

exports.myinfo = async function (req, res, next) {
    try {
        const id = req.session.userId;
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

exports.put = async function (req, res, next) {
    try {
        let {
            id,
            fullName,
            email,
            password,
            billing_address,
            shipping_address,
            phone,
        } = req.body;

        id = id ? id : req.session.userId

        let bdTotal = await getDbUser();
        // console.log(bdTotal)
        if (id) {
            let prodName = await bdTotal.filter((user) =>
                user.id == id
            );
            if (!prodName.length) {//si no hay algún nombre
                res
                    .status(404)
                    .send({ info: "Sorry, the product you are looking for is not here." });
            } else {
                if (fullName) prodName[0].set({ fullName })
                if (email) prodName[0].set({ email })
                if (password) prodName[0].set({ password: CryptoJS.HmacSHA1(prodName[0].securityString, password).toString(CryptoJS.enc.Base64) })
                if (billing_address) prodName[0].set({ billing_address })
                if (shipping_address) prodName[0].set({ shipping_address })
                if (phone) prodName[0].set({ phone })
                await prodName[0].save();
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({ info: "No id" });
        }
    } catch (error) {
        next(error);
    }
}

exports.modifyMyData = async function (req, res, next) {
    try {
        let {
            fullName,
            email,
            password,
            billing_address,
            shipping_address,
            phone,
        } = req.body;

        let id = req.session.userId

        let bdTotal = await getDbUser();
        // console.log(bdTotal)
        if (id) {
            let prodName = await bdTotal.filter((user) =>
                user.id == id
            );
            if (!prodName.length) {//si no hay algún nombre
                res
                    .status(404)
                    .send({ info: "Sorry, the product you are looking for is not here." });
            } else {
                if (fullName) prodName[0].set({ fullName })
                if (email) prodName[0].set({ email })
                if (password) prodName[0].set({ password: CryptoJS.HmacSHA1(prodName[0].securityString, password).toString(CryptoJS.enc.Base64) })
                if (billing_address) prodName[0].set({ billing_address })
                if (shipping_address) prodName[0].set({ shipping_address })
                if (phone) prodName[0].set({ phone })
                await prodName[0].save();
                res.status(201).send(prodName[0])
            }
        } else {
            res.status(404).send({ info: "No id" });
        }
    } catch (error) {
        next(error);
    }
}

exports.shippingDataRequirement = async function (req, res, next) {
    const {
        billing_address,
        shipping_address,
        phone
    } = req.body
    if (
        billing_address &&
        shipping_address &&
        phone
    ) {
        next()
    } else {
        res.status(404).send({ info: "Needs shipping info" })
    }
}

exports.logout = async function (req, res, next) {
    req.session.destroy(err => {
        if (err) {
            res.status(404).send({ info: err })
        }
        res.clearCookie('sid');
        res.status(200).send({ info: "Logout succesfull" })
    })

}

