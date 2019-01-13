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

/*var data = "a,b,c\n1,2,3".split("\n").map(function(x) { return x.split(","); });
var XLSX = require('xlsx');

/!* helper to generate the workbook object *!/
function make_book() {
    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    return wb;
}

function get_data(req, res, type) {
    var wb = make_book();
    /!* send buffer back *!/
    res.status(200).send(XLSX.write(wb, {type:'buffer', bookType:type}));
}

function get_file(req, res, file) {
    var wb = make_book();
    /!* write using XLSX.writeFile *!/
    XLSX.writeFile(wb, file);
    res.status(200).send("wrote to " + file + "\n");
}

function load_data(file) {
    var wb = XLSX.readFile(file);
    /!* generate array of arrays *!/
    data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1});
    console.log(data);
}

function post_data(req, res) {
    var keys = Object.keys(req.files), k = keys[0];
    load_data(req.files[k].path);
    res.status(200).send("ok\n");
}

function post_file(req, res, file) {
    load_data(file);
    res.status(200).send("ok\n");
}*/

module.exports = Gold;