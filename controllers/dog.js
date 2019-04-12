const Dog = require('../models/dog');

// render all dog pictures
async function getAll(req, res) {
    // const statesArray = "Georgia"
    const dogsArray = await Dog.getAlldogs();
    res.render('all-dogs', {
        locals: {
            dogs: dogsArray
        }
    });
}
async function statesPost(req,res) {
    const state= req.body.selectState;
    console.log(state);
    res.redirect('/state/GA')
}

module.exports = {
    getAll,
    statesPost
}