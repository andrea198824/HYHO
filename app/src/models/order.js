const { DataTypes, DatabaseError } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('order', {
    // title: {
    //   type: DataTypes.TEXT,
    //   allowNull: false
    // },
    // price: { 
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // quantity: { 
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    status:{  
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
      allowNull: false
  },
  payment_id:{
      type: DataTypes.INTEGER,
      defaultValue: 0
  },
  payment_status:{
      type: DataTypes.STRING,
      defaultValue: ""
  },
  merchant_order_id: {
      type: DataTypes.BIGINT,
      defaultValue: 0
  },
  })
}