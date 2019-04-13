const Favorite = require('../models/favorite');
const User = require('../models/user');

// render all dog pictures
async function getAll(req, res) {
    // const { id } = req.params;
    const dogsArray = await Favorite.getUserFavorites(req.session.user);
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('favorite', {
                locals: {
                    dogsA: dogsArray,
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
        } else if (userInstance.orgId === null) {
            res.render('favorite', {
                locals: {
                    dogsA: dogsArray,
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
        }
    } else {
        res.render('favorite', {
            locals: {
                dogsA: dogsArray,
                message: 'About page.',
                signup: 'Sign up',
                login: 'Log in',
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
    getAll
}