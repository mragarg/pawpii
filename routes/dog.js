const express = require('express');
const Router = express.Router;
const dogRoutes = Router();

const {
    getAll, statesPost
} = require('../controllers/dog');

dogRoutes.get('/', getAll);

dogRoutes.post('/', statesPost);

module.exports = dogRoutes;