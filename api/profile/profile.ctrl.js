const models = require('../../model');

exports.getProfile = async (req, res) => {
  const { member } = req;

  try {
    const memberInfo = {
      name: member.name,
      point: member.point,
      grade: member.grade,
      room: member.room,
    };

    return res.status(200).json({
      status: 200,
      message: '성공',
      data: {
        member: memberInfo,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: '서버 오류',
    });
  }
}
