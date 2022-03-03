const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height : {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    weight : {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    life_span: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    image: {
      type: DataTypes.TEXT,
    },
    bred_for: {
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};