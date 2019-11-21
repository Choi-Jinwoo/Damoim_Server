const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('member', {
    id: {
      type: DataTypes.STRING(45),
      primaryKey: true,
      allowNull: false,
    },
    pw: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
      defautValue: 0,
    },
    grade: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
    },
    room: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
    },
    quest_idx: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
      defautValue: 1,
    }
  });

  return Member;
};
