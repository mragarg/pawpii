const express = requrie('express');
const Router = express.Router;
const userRoutes = Router();

const {
    getLoginPage
} = require('../controllers/user');

userRoutes.get('/login', getLoginPage);

module.exports = userRoutes;