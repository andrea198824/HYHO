'use strict'
const { Admin, Category, Form, Order, Products, User } = require('../db');

const getDbUser = async () => {
    return await User.findAll();    
}

exports.needsUser = async (req, res, next) => {
    if(!req.session.userId) {
      res.status(401).send({info: "Login required"});
    } else {
        let prodName = await getDbUser()
        // console.log(prodName)
        prodName = prodName.filter((user) =>
        user.id == req.session.userId
        );
        if (prodName.length) {
            next();
        } else {
            res.status(404).send({info: "Login error"});
        }
    }
}

exports.needsAdmin = async (req, res, next) => {
    if(!req.session.userId) {
        res.status(401).send({info: "Login required"});
      } else {
          let prodName = await getDbUser().filter((user) =>
          user.id == req.session.userId
          );
          if (prodName.length) {
              if (req.session.role == "admin") {
                  next();
              } else {
                res.status(401).send({info: "Admin registered required"});
              }
          } else {
              res.status(404).send({info: "Login error"});
          }
      }
}
