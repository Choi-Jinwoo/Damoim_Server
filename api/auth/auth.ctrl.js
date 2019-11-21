const models = require('../../model');
const tokenLib = require('../../lib/token');

exports.login = async (req, res) => {
  const { id, pw } = req.body;

  try {
    const userData = await models.member.findOne({
      where: {
        id,
        pw,
      },
      raw: true
    });

    if (!userData) {
      return res.status(401).json({
        status: 401,
        message: '유저 정보가 존재하지 않습니다.',
      });
    }
    const token = await tokenLib.createToken(id);
    return res.status(200).json({
      status: 200,
      message: '성공.',
      data: { 'x-access-token': token },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: '서버 오류',
    });
  }
};

exports.signUp = async (req, res) => {
  const { body } = req;

  body.point = 0;
  body.quest_idx = 0;
  console.log(body);
  try {
    await models.member.create(body);
    return res.status(200).json({
      status: 200,
      message: '회원가입이 완료되었습니다.',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: '회원가입에 실패하였습니다.',
    });
  }
};
