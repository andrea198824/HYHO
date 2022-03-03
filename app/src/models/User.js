const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER
    },
    fullName: {
      type: DataTypes.ENUM('first', 'last'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
    password: {
      type: DataTypes.STRING(64),
      validate: {
        is: /^[0-9a-f]{64}$/i
      }
    },
    billing_address: {
      type: DataTypes.ENUM(
        'streetName',
        'streetNumber',
        'aptNumber',
        'city',
        'provincia',
        'country'
      )
    },
    shipping_address: {
      type: DataTypes.ENUM(
        'streetName',
        'streetNumber',
        'aptNumber',
        'city',
        'provincia',
        'country'
      )
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}
