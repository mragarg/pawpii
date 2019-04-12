const express = require('express');
const Router = express.Router;
const organizationRoutes = Router();

const {
    getAllDogs,
    addDogForm
} = require('../controllers/organization');

organizationRoutes.get('/dog/:id', getAllDogs);

organizationRoutes.get('/add', addDogForm);

organizationRoutes.post('/add', (req, res) => {
    res.send('you posted faceass');
});

module.exports = organizationRoutes; 