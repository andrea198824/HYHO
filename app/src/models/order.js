const { DataTypes, DatabaseError } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('order', {
    status:{  
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed', "approved"),
      allowNull: false
  },
  payment_id:{
      type: DataTypes.STRING,
      defaultValue: ""
    },

  payment_status:{
      type: DataTypes.STRING,
      defaultValue: ""
  },
  merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0
  },
//   cart: {
//     type: DataTypes.TEXT,
// }
  })
}