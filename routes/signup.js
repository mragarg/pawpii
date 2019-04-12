const express = require('express');
const Router = express.Router;
const signupRoutes = Router();

const {
    test,
    addUser,
    addOrganization
} = require('../controllers/signup');

signupRoutes.get('/', test);
signupRoutes.post('/', addUser);
signupRoutes.post('/organization', addOrganization)


module.exports = signupRoutes;