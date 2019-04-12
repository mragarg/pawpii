const express = require('express');
const Router = express.Router;
const signupRoutes = Router();

const {
    test,
    addUser
} = require('../controllers/signup');

signupRoutes.get('/', test);
signupRoutes.post('/', addUser);


module.exports = signupRoutes;