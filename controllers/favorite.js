const Favorite = require('../models/favorite');

// render all dog pictures
async function getAll(req, res) {
    // const { id } = req.params;
    const dogsArray = await Favorite.getUserFavorites(req.session.user);
    res.render('all-dogs', {
        locals: {
            dogs: dogsArray
        }
    });
}

module.exports = {
    getAll
}