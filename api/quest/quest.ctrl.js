const models = require('../../model');

exports.getQuest = async (req, res) => {
  const { member } = req;
  const { quest_idx } = member;

  try {
    const quest = await models.quest.findOne({
      where: {
        idx: quest_idx,
      },
      raw: true,
    });

    if (!quest) {
      return res.status(404).json({
        status: 404,
        message: '퀘스트가 존재하지 않습니다.',
      });
    }

    return res.status(200).json({
      status: 200,
      message: '성공',
      data: {
        quest,
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: '서버 오류',
    });
  }
}

exports.succesQuest = async (req, res) => {
  const { member } = req;
  let { quest_idx } = member;

  try {
    const quest = await models.quest.findOne({
      where: {
        idx: quest_idx,
      },
      raw: true,
    });

    if (!quest) {
      return res.status(404).json({
        status: 404,
        message: '퀘스트가 존재하지 않습니다.',
      });
    }

    const point = member.point + quest.point;
    quest_idx = quest_idx + 1;
    await models.member.update({
      point,
      quest_idx,
    }, {
      where: {
        id: member.id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: '성공',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: '오류',
    });
  }

}