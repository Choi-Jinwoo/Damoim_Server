const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define('quest', {
    idx: {
      type: DataTypes.INTEGER(45),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    point: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  });

  return Quest;
};
