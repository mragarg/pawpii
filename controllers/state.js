const Organization = require('../models/organization');
const User = require('../models/user');



async function orgsByState(req, res) {
    console.log("test $$$$$$$$$$$$$$")

    const {state} = req.params;
    console.log(state);
    const allOrgs = await Organization.retrieveInfoByState(state);

    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('orgs-by-state', {
                locals: {
                    orgs: allOrgs,
                    state: state,
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
            res.render('orgs-by-state', {
                locals: {
                    orgs: allOrgs,
                    state: state,
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
        res.render('orgs-by-state', {
            locals: {
                orgs: allOrgs,
                state:state,
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
// async function orgDogs(req, res) {
// console.log('test*********************')
// const id = 3;
// console.log(id);
// res.redirect (`org-dogs/${id}`);

// }


module.exports = {
    orgsByState
    // orgDogs
}