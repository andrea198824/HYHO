const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('quantity', {
    // orders
    // products
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  })
}
