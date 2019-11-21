const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const MeetingMember = sequelize.define('meeting_member', {
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
    meeting_idx: {
      type: DataTypes.INTEGER(45),
      allowNull: false,
    }
  });

  return MeetingMember;
};
