const express = require('express');
const Router = express.Router;
const aboutRoutes = Router();

const {
    checkLogin
} = require('../controllers/about');

aboutRoutes.get('/', checkLogin);

module.exports = aboutRoutes;