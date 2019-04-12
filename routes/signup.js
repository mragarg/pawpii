const express = require('express');
const Router = express.Router;
const signupRoutes = Router();

const {
    test
} = require('../controllers/signup');

signupRoutes.get('/', test);


module.exports = signupRoutes;