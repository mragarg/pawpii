const User = require('../models/user');
const Organization = require('../models/organization');
const escape = require('../utils');

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

function checkLogin(req, res) {
    if (req.session.user) {
        res.render('signup', {
            locals: {
                signup: 'd-none',
                login: 'd-none',
                favorite: 'Favorite',
                logout: 'Log out'

            }
        });
    } else {
        res.render('signup', {
            locals: {
                signup: 'Sign up',
                login: 'Log in',
                favorite: 'd-none',
                logout: 'd-none'

            }
        });
    }
}

module.exports = {
    addUser,
    checkLogin
}