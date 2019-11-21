const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('meeting', {
    idx: {
      type: DataTypes.INTEGER(45),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    member_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    max_member: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
      defaultValue: 0,
    },
    place_idx: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
    },
    is_leauge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });

  return Meeting;
};
