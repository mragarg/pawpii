const Favorite = require('../models/favorite');

// render all dog pictures
async function getAll(req, res) {
    // const { id } = req.params;
    const dogsArray = await Favorite.getUserFavorites(req.session.user);
    res.render('favorite', {
        locals: {
            dogs: dogsArray
        }
    });
}

async function checkLogin(req, res) {
    const dogsArray = await Favorite.getUserFavorites(req.session.user);
    if (req.session.user) {
        res.render('favorite', {
            locals: {
                dogs: dogsArray,
                signup: 'd-none',
                login: 'd-none',
                favorite: 'Favorite',
                logout: 'Log out'

            }
        });
    } else {
        res.render('favorite', {
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
    getAll,
    checkLogin
}