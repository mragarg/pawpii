const express = require('express');
const Router = express.Router;
const signupRoutes = Router();

const {
    addUser,
    checkLogin,
    addOrganization
} = require('../controllers/signup');

signupRoutes.get('/', checkLogin);
signupRoutes.post('/', addUser);
signupRoutes.post('/organization', addOrganization)


module.exports = signupRoutes;