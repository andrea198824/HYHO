const { DataTypes, DatabaseError } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('order', {
    order: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Cancelled', 'Finalized'),
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}