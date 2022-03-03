
const { DataTypes, DatabaseError } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    product: {
      type: DataTypes.STRING,
      allownull: false,
      ref:"product",
    },
    date: {
        type: DataTypes.DATE,
        allownull: false,
    },
    status: {
        type: DataTypes.ENUM('Active','Finalized'),
        allowNull: true,
    },
    quantity:{
        type: DataTypes.NUMBER,
    },
    price: {
        type: DataTypes.NUMBER,
    }
});
};