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

async function addOrganization(req, res) {
    const city = escape(req.body.city);
    const address = escape(req.body.address);
    const name = escape(req.body.name);
    const state = escape(req.body.state);
    const zip = escape(req.body.zip);
    const phone = escape(req.body.phone);
    const orgEmail = escape(req.body.orgEmail);
    const orgPassword = escape(req.body.orgPassword);
    const description = escape(req.body.description);
    const url = escape(req.body.url);

    const addOrgan = await Organization.addOrganization(name, address, city, state, zip, phone, orgEmail, orgPassword, description, url);
    console.log(addOrgan);
    const instanceOrgan = new Organization(addOrgan.id, addOrgan.name, addOrgan.address, addOrgan.city, addOrgan.state, addOrgan.zip, addOrgan.phone, addOrgan.email, addOrgan.password, addOrgan.description, addOrgan.website);
    console.log(instanceOrgan);

}

module.exports = {
    test,
    addUser,
    addOrganization
}