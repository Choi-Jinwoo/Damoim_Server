const questCtrl = require('./quest.ctrl');
const auth = require('../../middleware/auth');
const quest = require('express').Router();

quest.get('/', auth, questCtrl.getQuest);
quest.get('/success', auth, questCtrl.succesQuest);

module.exports = quest;
