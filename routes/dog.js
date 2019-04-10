const express = require('express');
const Router = express.Router;
const dogRoutes = Router();

const {
    getAll
} = require('../controllers/dog');

dogRoutes.get('/', getAll);

module.exports = dogRoutes;