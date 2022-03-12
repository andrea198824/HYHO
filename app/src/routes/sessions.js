'use strict'
let { Category, Form, Order, Products, User } = require('../db');
let { Admin } = require('../db').conn.models;



const session = require('express-session');

exports.get = async function(req, res, next){
    let { id } = req.query
    let Session = require('../db').conn.models.Session
    let allSessions = await Session.findAll();
    console.log("res.locals :",res.locals)
    console.log("allSessions        :",allSessions)
    allSessions = allSessions.map(el => {
        return {
            session_id : el.session_id,
            data: JSON.parse(el.data)

        }
    })
    if (id){
        let sessionById = allSessions.filter(el => el.data.userId == id)
        res.status(200).send(sessionById)
    } else {
        res.status(200).send(allSessions)
    }
 }

exports.counter = async function(req, res, next){
    if (req.session.views) {
            
        // Increment the number of views.
        req.session.views++

        // Print the views.
        console.log('<p> No. of views: ' 
            + req.session.views + '</p>') 
        next()  
        } else {
        req.session.views = 1
        console.log(' New session is started')
        next()  
        }
 }