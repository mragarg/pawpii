const db = require('./conn');


class Favorite {

    static getUserFavorites(userId){
        db.any(`select * from favorites f
        inner join users u
            on f.users_id = u.id
        inner join dogs d
            on f.dog_id = d.id
        where u.id = $1
        `, [userId]);
    }

}

module.exports = Favorite;