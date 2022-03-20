
const { DataTypes, DatabaseError } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("form", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
      descriptions: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
      },
});
};

