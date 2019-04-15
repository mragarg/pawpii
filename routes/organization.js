const express = require('express');
const Router = express.Router;
const organizationRoutes = Router();

const {
    getAllDogs,
    addDogForm,
    addDogDB,
    deleteDogForm,
    getProfile,
    addToFavorites
} = require('../controllers/organization');

organizationRoutes.get('/dogs/:id', getAllDogs);

organizationRoutes.get('/dogs/:id/:id', getProfile);

organizationRoutes.post('/dogs/:id/:id', addToFavorites)

organizationRoutes.get('/add-delete', addDogForm);

organizationRoutes.post('/add-delete', addDogDB);

// organizationRoutes.get('/delete', deleteDogForm);

organizationRoutes.post('/add-delete/:id', deleteDogForm);

// organizationRoutes.post('/add-delete-d', deleteDogForm);

module.exports = organizationRoutes; 