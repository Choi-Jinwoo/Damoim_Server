const api = require('express').Router();

api.use('/auth', require('./auth'));
api.use('/meeting', require('./meeting'));
api.use('/quest', require('./quest'));

module.exports = api;