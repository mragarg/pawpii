const express = require('express');
const Router = express.Router;
const loginRoutes = Router();

const {
    getLoginPage,
    attemptLogin,
    checkLogin
} = require('../controllers/login');

loginRoutes.get('/', checkLogin, getLoginPage);

loginRoutes.post('/', attemptLogin);


module.exports = loginRoutes;