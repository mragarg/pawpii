const Dog = require('../models/dog');

async function getAll(req, res) {
    const dogsArray = await Dog.getAlldogs();
    console.log(dogsArray);
    res.render('all-dogs', {
        locals: {
            dogs: dogsArray
        }
    });
}

module.exports = {
    getAll
}