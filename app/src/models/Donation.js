const { DataTypes, DatabaseError } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("donation", {
    value: {
      type: DataTypes.BIGINT,
    },
    email:{
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.TEXT,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    payment_id: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

    payment_status: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    preference_id:{
      type: DataTypes.STRING,
      defaultValue: ""
    }
  });
};
