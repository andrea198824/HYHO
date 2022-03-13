"use strict";
const { Newsletter } = require("../db");
const axios = require("axios");

const getDbEmail = async () => {
  return await Newsletter.findAll();
};

exports.post = async function (req, res) {
  const { email } = req.body;
  console.log(req.body);
  try {
    let newEmail = await Newsletter.findOrCreate({ where: { email: email } });
    res.send(newEmail);

    var data = {
      service_id: "service_fczrg7r",
      template_id: "template_fq7pgfk",
      user_id: "Etuy2aI4BobaC1Ikh",
      accessToken: "HVKD--JTBeTA45UbNUJAp",
      template_params: {
        email: email,
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
      })
      .catch((error) => {
        console.error(error);
      });

    res.send("correo enviado");
  } catch (error) {
    console.log(error);
    //next(error);
  }
};

exports.get = async function (req, res, next) {
  try {
    const { email } = req.query;
    let bdEmail = await getDbEmail();
    console.log("id :", email);
    console.log("bdTotal    :", bdEmail);
    if (email) {
      let emailDB = await bdEmail.filter((form) => {
        return form.dataValues.email == email;
      });
      emailDB.length //si hay algún nombre
        ? res.status(200).send(emailDB)
        : res.status(404).send({
            info: "Sorry, the email you are looking for is not here.",
          });
    } else {
      res.status(200).send(bdEmail);
    }
  } catch (error) {
    next(error);
  }
};

