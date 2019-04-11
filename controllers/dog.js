const Dog = require('../models/dog');

// render all dog pictures
async function getAll(req, res) {
    const dogsArray = await Dog.getAlldogs();
    res.render('all-dogs', {
        locals: {
            dogs: dogsArray
        }
    });
}

module.exports = {
    getAll
}