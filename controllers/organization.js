const Organization = require('../models/organization');

async function getAllDogs(req, res) {
    const {id} = req.params
    const dogsArray = await Organization.retrieveDogsById(id);
    console.log(dogsArray);
    res.render('org-dogs', {
        locals: {
            dogs: dogsArray
        }
    });
}

module.exports = {
    getAllDogs
}