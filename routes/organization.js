const express = require('express');
const Router = express.Router;
const organizationRoutes = Router();

const {
    getAllDogs,
    addDogForm,
    addDogDB,
    deleteDogForm
} = require('../controllers/organization');

organizationRoutes.get('/dogs/:id', getAllDogs);

organizationRoutes.get('/add', addDogForm);

organizationRoutes.post('/add', addDogDB);

organizationRoutes.get('/delete', deleteDogForm)

organizationRoutes.post('/delete', )

module.exports = organizationRoutes; 