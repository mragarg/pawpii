const express = require('express');
const Router = express.Router;
const organizationRoutes = Router();

const {
    getAllDogs,
    addDogForm,
    addDogDB
} = require('../controllers/organization');

organizationRoutes.get('/dog/:id', getAllDogs);

organizationRoutes.get('/add', addDogForm);

organizationRoutes.post('/add', addDogDB);

module.exports = organizationRoutes; 