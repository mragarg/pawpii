const User = require('../models/user');
const Organization = require('../models/organization');

async function test(req, res) {
    res.render('signup', {
        locals: {
            message: "Sign up please."
        }
    });
}

module.exports = {
    test
}