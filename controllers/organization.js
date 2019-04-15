const Organization = require('../models/organization');
const User = require('../models/user');
const Dog =require('../models/dog');
const Favorite = require('../models/favorite')

async function getAllDogs(req, res) {
    const {id} = req.params
    const dogsArray = await Organization.retrieveDogsById(id);
    const orgInfo = await Organization.retrieveOrgInfo(id);
    console.log('*******************');
    console.log(orgInfo.id)
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        if (userInstance.orgId) {
            res.render('org-dogs', {
                locals: {
                    dogsA: dogsArray,
                    orgs: orgInfo,
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    orgId: orgInfo.id
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('org-dogs', {
                locals: {
                    dogsA: dogsArray,
                    orgs: orgInfo,
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
        res.render('org-dogs', {
            locals: {
                dogsA: dogsArray,
                orgs: orgInfo,
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

async function addDogForm(req, res) {

    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);
        const orgInfo = await Organization.retrieveOrgInfo(req.session.user);

        const dogsArray = await Organization.retrieveDogsById(userInstance.orgId);
        if (userInstance.orgId) {

            res.render('add-dog', {
                locals: {
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    dogsA: dogsArray,
                    org: orgInfo
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('error', {
                locals: {
                    message: 'User cannot add / delete dogs.',
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: ''
                }
            });
        }
    } else {
        res.render('error', {
            locals: {
                message: "Go away.",
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

async function addDogDB(req, res) {

    // console.log('----------THIS IS TOP OF TESTING LINE SESSION----------')
    // console.log(req.session.user);
    // console.log('----------THIS IS BOTTOM OF TESTING LINE SESSION----------')

    const userInstance = await User.getById(req.session.user);
    // console.log(userInstance);
    // console.log(userInstance.orgId);

    if(userInstance.orgId === null) {
        res.send("Access Denied! User is not an organization.");
    }
    else{
        console.log('Adding Dog');
        await userInstance.addDog(req.body.dogName, req.body.dogBreed, req.body.dogAge, req.body.dogDescription, req.body.dogImg);
        console.log('ADDED :)  Dog');
        res.redirect(`/organization/dogs/${userInstance.orgId}`)
    }
}

async function deleteDogForm(req, res) {
    const {id} = req.params

   
    const userInstance = await User.getById(req.session.user);
    await userInstance.deleteFavorite(id);
    await userInstance.deleteDog(id);
    const dogsArray = await Organization.retrieveDogsById(userInstance.orgId);

    // res.redirect('/organization/add-delete');
    const orgInfo = await Organization.retrieveOrgInfo(req.session.user);
    if (req.session.user) {
        const userInstance = await User.getById(req.session.user);

        if (userInstance.orgId) {
            res.render('add-dog', {
                locals: {
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'd-none',
                    ad: 'Add / Delete',
                    dogs: 'Current dogs',
                    logout: 'Log out',
                    id: userInstance.orgId,
                    dogsA: dogsArray,
                    org: orgInfo
                }
            });
        } else if (userInstance.orgId === null) {
            res.render('delete-dog', {
                locals: {
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
        res.render('delete-dog', {
            locals: {
                signup: 'd-none',
                login: 'd-none',
                favorite: 'd-none',
                ad: 'Add / Delete',
                dogs: 'Current dogs',
                logout: 'Log out'
            }
        });
    }

}
async function getProfile (req, res) {
    if (req.session.user) { 
    const {id} = req.params;
    const userInstance = await User.getById(req.session.user);    
    const favoriteArray = await Favorite.getUserFavorites(req.session.user);
    console.log(favoriteArray)
    let inFavorite = false;
    const oneDog = await Dog.getOneDog(id)
    for(let i=0; i<favoriteArray.length; i++) {
        console.log(favoriteArray[i].dog_id)
        if (favoriteArray[i].dog_id === oneDog.id){
            inFavorite = true 
            console.log('DONEEEEEEEEEEEEEEE')
            break;
        }
    }
    let favorited = 'https://i.imgur.com/4PfDTQ4.png';

    if (inFavorite) {
        favorited = 'https://i.imgur.com/BPk44AP.png'
    }

        if (userInstance.orgId === null) { 
            // FOR LOOP CHECK FOR EXISTENCE IN ARRAY 
            console.log(oneDog)
            res.render('dog-profile', {
                locals: {
                    signup: 'd-none',
                    login: 'd-none',
                    favorite: 'Favorite',
                    ad: 'd-none',
                    dogs: 'd-none',
                    logout: 'Log out',
                    id: '',
                    dog: oneDog,
                    favoritepic: favorited
                }
                });
            }  else { 
                    res.render('dog-profile', {
                        locals: {
                            signup: 'd-none',
                            login: 'd-none',
                            favorite: 'd-none',
                            ad: 'Add / Delete',
                            dogs: 'Current dogs',
                            logout: 'Log out',
                            id: '',
                            dog: oneDog,
                            favoritepic: ''
                        }
                    });
                }
    }
    else { 
        res.redirect('/login')
         }
}
async function addToFavorites (req, res) {
    console.log('TESTTTTTTTTTTTT')
    const {id} = req.params
    let userTest = await User.getById(req.session.user)
    console.log("MADE IT THIS FAR");
    const oneDog = await Dog.getOneDog(id)

    const favorited = await userTest.addFavorite(userTest.id, oneDog.id)
    console.log(favorited)
    
    res.redirect(`/organization/dogs/${oneDog.org_id}/${oneDog.id}`)
}


module.exports = {
    getAllDogs,
    addDogForm,
    addDogDB,
    deleteDogForm,
    getProfile,
    addToFavorites
}