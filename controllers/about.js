const User = require('../models/user');

const userInstance = await User.getById(req.session.user);
if (userInstance.orgId && req.session.user) {
    res.render('about', {
        locals: {
            message: 'About page.',
            signup: 'd-none',
            login: 'd-none',
            favorite: 'd-none',
            ad: 'Add / Delete',
            dogs: 'Current dogs',
            logout: 'Log out',
            id: userInstance.orgId
        }
    });
} else if (userInstance.orgId === null && req.session.user) {
    res.render('about', {
        locals: {
            message: 'About page.',
            signup: 'd-none',
            login: 'd-none',
            favorite: 'Favorite',
            ad: 'd-none',
            dogs: 'd-none',
            logout: 'Log out',
            id: userInstance.orgId
        }
    });
} else {
    res.render('about', {
        locals: {
            message: 'About page.',
            signup: 'Sign up',
            login: 'Log in',
            favorite: 'd-none',
            ad: 'd-none',
            dogs: 'd-none',
            logout: 'd-none',
            id: userInstance.orgId
        }
    });
}

module.exports = {
    checkLogin
}

