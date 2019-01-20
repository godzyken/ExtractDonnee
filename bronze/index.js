const XlsxExtractor = require('../utils/xlsxExtravtor');
const FinderCV = require('../utils/finderCv');
const FinderPics = require('../utils/finderPics');
const fs = require('fs');
const request = require('request');
const stream = require('stream');
const dl = require('../downloader');

const columns = {
    email: 0,
    first_name: 1,
    last_name: 2,
    address: 3,
    ccp: 4,
    ville: 5,
    mobile_phone: 6,
    picture: 7,
    nomCv: 8,
    matieres: 9
};

module.exports = async (Models) => {
    const {headers, rows} = XlsxExtractor("./BDD Bronze insert.xlsx");
    const {titreCv, destCV} = FinderCV("../wetransfer-006b10/BBD Bronze/BBD Bronze/CV");
    const {blobpics, pocs} = FinderPics("../wetransfer-006b10/BBD Bronze/BBD Bronze/Photos");

    for (row of rows) {

        /* --- Extrait un User par ligne/row du fichier excel --- */

        const user = Models.User.build();
        user.email = row[headers[columns.email]];
        user.first_name = row[headers[columns.first_name]];
        user.last_name = row[headers[columns.last_name]];
        user.address = row[headers[columns.address]];
        user.ccp = row[headers[columns.ccp]];
        user.ville = row[headers[columns.ville]];
        user.mobile_phone = row[headers[columns.mobile_phone]];
        user.picture = row[headers[columns.picture]];
        user.nomCv = row[headers[columns.nomCv]];
        user.matieres = row[headers[columns.matieres]];


        for (titreCv of destCV) {

            /* ---- Récuperer la liste de Cv.pdf ---- */
            user.nomCv = row[titreCv[columns.nomCv]];
        }

        for(poc of pocs) {

            /* ---- Recuperer la liste de photo-profile ---- */
            user.picture = row[blobpics[columns.picture]];
        }


        let uri = user.picture;

        let filename = [user.first_name] + [user.last_name];

        let path = '.' + filename;

        console.log("l'Url de la photo profile est: " + uri);
        console.log("le nom de l'image serra: " + filename);
        console.log("le Cv fourni est le: " + user.nomCv);
        console.log("le fichier de destination sera: " + path);

        // sauvegarder chaque User dans la bdd
        await user.save();

        console.log(user.toJSON());

    }

    return rows;
};