'use strict'
let { Category, Form, Order, Products, User } = require('../db');
let { Admin } = require('../db').conn.models;



const session = require('express-session');

exports.get = async function(req, res, next){
    let Session = require('../db').conn.models.Session
    let allSessions = await Session.findAll();
    console.log("allSessions        :",allSessions)
    // console.log("Session    :",Session)
    // console.log("Admin    :",Admin)
    // console.log("Category    :",Category)
    // console.log("Session    :",require('../db').conn.models.Admin)
    // console.log("Admin    :",require('../db').conn.models.Session)
    res.sendStatus(200)
 }