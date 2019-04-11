const express = require('express');
const Router = express.Router;
const favoriteRoutes = Router();

const {
    getAll
} = require('../controllers/favorite');

favoriteRoutes.get('/:id', getAll);

module.exports = favoriteRoutes;