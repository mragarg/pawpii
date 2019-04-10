const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const Favorite = require('../models/favorite');

// Favorite Model TDD
describe('Favorite Model', () => {

    it('should return an array of user favorite dogs', async () => {
        const userFavorite = await Favorite.getUserFavorites(1);
        console.log(userFavorite);
        expect(userFavorite).to.be.instanceOf(Array);
    });

});