'use strict'
const { Admin, Category, Form, Order, Products, User, Session } = require('../db');

const session = require('express-session');

exports.get = async function(req, res, next){

    let allSessions = await Admin.findAll();
    console.log(allSessions)
    console.log(require('../db').ModeManager)
    res.sendStatus(200)
 }