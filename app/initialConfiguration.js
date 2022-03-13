//---------------------Initial admin-------------------//
const { Admin, Category, Form, Order, Products, User } = require('./src/db');

var CryptoJS = require("crypto-js");

let securityString = "randomString"
let password = "12345678"
password = CryptoJS.HmacSHA1(securityString, password).toString(CryptoJS.enc.Base64)
exports.do = async () => {
    let user = await User.findAll({
      where: {id: 1}
    })
    if (!user.length) {
      await User.create({
        fullName:"Admin",
        email:"Admin@gmail.com",
        password,
        securityString,
        emailVerificated:true,
        adminVerificated:true,
        billing_address:"",
        shipping_address:"",
        phone:"",
      });
    }
  }