const User = require('../models/user');

function getLoginPage(req, res) {
    res.send('Login Page');
}

module.exports = {
    getLoginPage
}