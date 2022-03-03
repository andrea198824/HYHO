
const { DataTypes, DatabaseError } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    productQuantity: {
      type: DataTypes.ARRAY (DataTypes.JSON), 
      allowNull: false,
      ref:"product",
      // Ejemplo
      // [
//     {
//       product: "product 1",
//       price: 2
//     },
//       {
//       product: "product 2",
//       price: 22
//     },
//       {
//       product: "product 3",
//       price: 6.7
//     },
//   ]
    },
    status: {
        type: DataTypes.ENUM('Active','Finalized'),
        allowNull: true,
    },
    total: {
        type: DataTypes.INTEGER,
    }
});
};

