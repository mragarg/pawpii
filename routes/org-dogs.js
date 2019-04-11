const express = require('express');
const Router = express.Router;
const orgDogRoutes = Router();

const {
    getAllDogs
} = require('../controllers/organization');

orgDogRoutes.get('/:id', getAllDogs);

module.exports = orgDogRoutes; 