const models = require('../../model');
const moment = require('moment');

exports.createMeeting = async (req, res) => {
  const { member } = req;
  const { body } = req;

  body.member_id = member.id;

  // 미팅 잡을때 같은 장소 & 같은 시간일 경우 오류 발생시키기
  try {
    const originMeeting = await models.meeting.findAll({
      where: {
        place_idx: body.place_idx,
        date: body.date,
      },
      raw: true,
    });

    for (let i = 0; i < originMeeting.length; i++) {
      const reqStartTime = moment(body.start_time, 'hh:mm:ss');
      const reqEndTime = moment(body.end_time, 'hh:mm:ss');

      const oriStartTime = moment(originMeeting[i].start_time, 'hh:mm:ss');
      const oriEndTime = moment(originMeeting[i].end_time, 'hh:mm:ss');

      const startIsBetween = reqStartTime.isSameOrAfter(oriStartTime) && reqStartTime.isSameOrBefore(oriEndTime);
      const endIsBetween = reqEndTime.isSameOrAfter(oriStartTime) && reqEndTime.isSameOrBefore(oriEndTime);

      if (startIsBetween || endIsBetween) {
        return res.status(400).json({
          status: 400,
          message: '이미 예약된 시간입니다.',
        });
      }
    }

    await models.meeting.create(body);
    return res.status(200).json({
      status: 200,
      message: '성공',
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      status: 500,
      message: '서버 오류',
    });
  }
}

exports.getMeetings = async (req, res) => {
  const today = moment().format('YYYY-MM-DD');

  try {
    const meetings = await models.meeting.findAll({
      where: {
        date: today,
      },
      raw: true,
    });

    for (let i = 0; i < meetings.length; i++) {
      const joined_member = await models.meetingMember.findAll({
        where: {
          meeting_idx: meetings[i].idx,
        },
        raw: true,
      });

      meetings[i].joined_member = joined_member.length;
    }
    console.log(meetings);
    return res.status(200).json({
      status: 200,
      message: '성공',
      data: {
        meetings,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: '서버 오류',
    });
  }
}

exports.joinMeeting = async (req, res) => {
  const { member } = req;
  const { idx } = req.params;

  try {
    const isExist = await models.meetingMember.findOne({
      where: {
        meeting_idx: idx,
        member_id: member.id,
      },
    })
    console.log(isExist)
    if (isExist) {
      return res.status(400).json({
        status: 400,
        message: '중복된 신청',
      });
    }

    const meeting = await models.meeting.findOne({
      where: {
        idx,
      },
      raw: true,
    });

    const meetingMember = await models.meetingMember.findAll({
      where: {
        meeting_idx: idx,
      },
      raw: true,
    });

    if (!meeting) {
      return res.status(404).json({
        status: 404,
        message: '방이 존재하지 않습니다.',
      });
    }

    if (meeting.max_member <= meetingMember.length) {
      return res.status(400).json({
        status: 400,
        message: '정원 초과',
      });
    }

    await models.meetingMember.create({
      member_id: member.id,
      meeting_idx: meeting.idx,
    });

    return res.status(200).json({
      status: 200,
      message: '성공',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: 500,
      message: '서버 오류',
    });
  }
}