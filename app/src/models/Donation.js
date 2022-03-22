const { DataTypes, DatabaseError } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define("donation", {
    cantidad: {
      type: DataTypes.FLOAT,

    },
  });
};
