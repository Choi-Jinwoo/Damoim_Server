const api = require('express').Router();

api.use('/auth', require('./auth'));
api.use('/meeting', require('./meeting'));
api.use('/quest', require('./quest'));
api.use('/profile', require('./profile'));

module.exports = api;