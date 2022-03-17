const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    given_name: {
      type: DataTypes.STRING,
    },
    family_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    admin_verified: {
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
      type: DataTypes.STRING,
      allowNull: true
    },
  })
}
