var db = require('../db');

var Bronze = {

    getbronze: function (callback) {
        return db.query('SELECT * FROM t_user', callback);
    },
    createbronze: function (Bronze, callback) {
        return db.query('INSERT INTO t_user(' +
            'email,' +
            'nom,' +
            'prenom,' +
            'address,' +
            'code_postal,' +
            'ville,' +
            'numero_telephone,' +
            'monCV,' +
            'matieres) values(' +
            '?,' +
            '?,' +
            '?,' +
            '?,' +
            '?,' +
            '?,' +
            '?,' +
            '?,' +
            '?)',[
                Bronze.email,
            Bronze.prenom,
            Bronze.address,
            Bronze.code_postal,
            Bronze.ville,
            Bronze.numero_telephone,
            Bronze.monCV,
            Bronze.matieres
        ], callback);
    }
};

var extractDonnee = require('../extractDonnee');

module.exports = Bronze;