const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('token', {
    token:{
        type: DataTypes.STRING,
        allowNull: true
    }
})
}