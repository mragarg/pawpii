const express = require('express');
const Router = express.Router;
const organizationRoutes = Router();

const {
    getAllDogs
} = require('../controllers/organization');

organizationRoutes.get('/dogs/:id', getAllDogs);

// organizationRoutes.get('/add', (req, res) => {
//     res.render('add-dog');
// });

organizationRoutes.post('/add', (req, res) => {
    res.send('you posted faceass');
});

module.exports = organizationRoutes; 