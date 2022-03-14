const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('products', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avaliable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  })
}