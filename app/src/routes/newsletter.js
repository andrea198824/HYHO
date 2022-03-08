"use strict";
const {Newsletter} = require("../db");

const getDbEmail = async () => {
  return await Newsletter.findAll();
};

exports.post = async function (req, res) {
  const { email } = req.body;
  try {
    let newEmail = await Newsletter.findOrCreate({ where : {email: email} });
    res.send(newEmail)
  } catch (error) {
        console.log(error)
    //next(error);
  }
};

