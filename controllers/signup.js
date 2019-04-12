const User = require('../models/user');
const Organization = require('../models/organization');
const escape = require('../utils');

async function test(req, res) {
    res.render('signup', {
        locals: {
            message: "Sign up please."
        }
    });
}

async function addUser(req, res) {
    const firstName = escape(req.body.firstName);
    const lastName = escape(req.body.lastName);
    const email = escape(req.body.email);
    const password = escape(req.body.password);
    const addUser = await User.add(firstName, lastName, email, password);
    console.log(addUser);
    const instanceUser = new User(addUser.id, addUser.first_name, addUser.last_name, addUser.email, addUser.password);
    console.log(instanceUser);
    // await addUser.save();
    console.log('you did the thing');
    await instanceUser.setPassword(password);
    await instanceUser.save();


    res.redirect('/');
}

module.exports = {
    test,
    addUser
}