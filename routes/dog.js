const express = require('express');
const Router = express.Router;
const dogRoutes = Router();

const {
    getAll,
    checkLogin
} = require('../controllers/dog');

dogRoutes.get('/', checkLogin, getAll);

module.exports = dogRoutes;