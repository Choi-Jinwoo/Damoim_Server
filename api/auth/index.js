const auth = require('express').Router();
const authCtrl = require('./auth.ctrl');

auth.post('/login', authCtrl.login);
auth.post('/sign-up', authCtrl.signUp);

module.exports = auth;
