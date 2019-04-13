const express = require('express');
const Router = express.Router;
const loginRoutes = Router();

const {
    getLoginPage,
    attemptLogin
} = require('../controllers/login');

loginRoutes.get('/', getLoginPage);

loginRoutes.post('/', attemptLogin);


module.exports = loginRoutes;