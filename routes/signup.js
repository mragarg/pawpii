const express = require('express');
const Router = express.Router;
const signupRoutes = Router();

const {
    addUser,
    checkLogin
} = require('../controllers/signup');

signupRoutes.get('/', checkLogin);
signupRoutes.post('/', addUser);


module.exports = signupRoutes;