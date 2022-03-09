const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('profile', {
    profile:{
        type: DataTypes.ENUM("user", "admin"),
        allowNull: true
    }
})
}