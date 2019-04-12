const express = require('express');
const Router = express.Router;
const favoriteRoutes = Router();

const {
    getAll,
    checkLogin
} = require('../controllers/favorite');

favoriteRoutes.get('/', checkLogin, getAll);

module.exports = favoriteRoutes;