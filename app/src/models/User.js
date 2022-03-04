const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define('user', {
    // id: {
    //   type: DataTypes.INTEGER
    // },
    fullName: {
      type: DataTypes.STRING,
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
        is: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'
        //8 caracters (minimum) 1 mayusculo y 1 numero
      }
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
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}
