const { DataTypes, STRING } = require('sequelize')

module.exports = sequelize => {
    sequelize.define('cart', {
        cart: {
            type: DataTypes.ARRAY(DataTypes.JSON),
        }
    })
}