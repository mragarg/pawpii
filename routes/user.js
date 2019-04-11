const express = require('express');
const Router = express.Router;
const userRoutes = Router();

userRoutes.get('/dashboard', (req, res) => {
    res.send('test');
})

module.exports = userRoutes;