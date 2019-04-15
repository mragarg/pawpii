const User = require('../models/user');

async function checkLogin(req, res) {
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('home', {
                locals: {
                    message: 'About us.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: '',
                    dogs: '',
                    logout: '',
                    id: userInstance.orgId
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('home', {
                locals: {
                    message: 'About us.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: '',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: '',
                    id: userInstance.orgId
                }
            });
        }
    } else {
        res.render('home', {
            locals: {
                message: 'About us.',
                signup: '',
                login: '',
                favorite: 'd-none',
                ad: 'd-none',
                dogs: 'd-none',
                logout: 'd-none',
                id: ''
            }
        });
    }
}

module.exports = {
    checkLogin
}