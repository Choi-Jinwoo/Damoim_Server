const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
    idx: {
      type: DataTypes.INTEGER(45),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  });

  return Place;
};
