const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('admin', {
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
  })
}
