
const { DataTypes, DatabaseError } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("productForm", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false
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
        allowNull: false
      },
});
};

