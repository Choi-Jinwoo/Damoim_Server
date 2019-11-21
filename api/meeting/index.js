const meetingCtrl = require('./meeting.ctrl');
const auth = require('../../middleware/auth');
const meeting = require('express').Router();

meeting.post('/', auth, meetingCtrl.createMeeting);
meeting.get('/', auth, meetingCtrl.getMeetings);
meeting.get('/:idx', auth, meetingCtrl.joinMeeting);

module.exports = meeting;
