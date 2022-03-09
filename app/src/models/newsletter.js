
const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("newsletter", {
    email: {
        type: DataTypes.STRING,
    allowNull: true
}});
};

