'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

//trae la info de db form
const getDbAdmin = async () => {
    return await Admin.findAll()    
}

exports.post = async function(req, res){
    res.status(404).send({info: "Endpoint no longer avaliable"});
}

exports.get = async function (req, res, next){
            res.status(404).send({info: "Endpoint no longer avaliable"});
}