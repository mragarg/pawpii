const db = require('./conn');


class Favorite {

    static getUserFavorites(userId){
        return db.any(`select * from favorites 
            inner join users 
                on favorites.users_id = users.id 
            inner join dogs 
                on favorites.dog_id = dogs.id 
            where users.id=$1`, [userId]);
    }

}

module.exports = Favorite;