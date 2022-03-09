const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING                      ,
      allowNull: false
    },
  })
}
