var db = require('../db');

var Gold = {

    getgold: function (callback) {
        return db.query('SELECT * FROM t_user', callback);
    },
    creategold: function (Gold, callback) {
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
            Gold.email,
            Gold.prenom,
            Gold.address,
            Gold.code_postal,
            Gold.ville,
            Gold.numero_telephone,
            Gold.monCV,
            Gold.matieres
        ], callback);
    }
}

module.exports = Gold;