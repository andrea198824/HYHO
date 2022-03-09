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
      type: DataTypes.STRING,
      allowNull: false
    },
    securityString: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verificated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    billing_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shipping_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING                      ,
      allowNull: true
    },
  })
}
