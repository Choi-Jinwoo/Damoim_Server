const profileCtrl = require('./profile.ctrl');
const auth = require('../../middleware/auth');
const profile = require('express').Router();

profile.get('/', auth, profileCtrl.getProfile);

module.exports = profile;
