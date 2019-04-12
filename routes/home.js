const express = require('express');
const Router = express.Router;
const homeRoutes = Router();

const {
    checkLogin
} = require('../controllers/home');

homeRoutes.get('/', checkLogin);

module.exports = homeRoutes;