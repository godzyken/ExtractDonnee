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
    matieres: 9,
    siret: 10
};

module.exports = async (Models) => {
    const {headers, rows} = XlsxExtractor("./BBD Gold.xlsx");
    const {titreCv, destCV} = FinderCV("../wetransfer-006b10/BBD Bronze/BBD Bronze/CV");
    const {blobpics, pocs} = FinderPics("../wetransfer-006b10/BBD Bronze/BBD Bronze/Photos");

    // let trainer = new user();
    const user = require('../models/User');

    for (row of rows) {

        /* --- Extrait un User par ligne/row du fichier excel --- */

        const trainer = Models.Trainer.build();
        trainer.email = row[headers[columns.email]];
        trainer.first_name = row[headers[columns.first_name]];
        trainer.last_name = row[headers[columns.last_name]];
        trainer.address = row[headers[columns.address]];
        trainer.ccp = row[headers[columns.ccp]];
        trainer.ville = row[headers[columns.ville]];
        trainer.mobile_phone = row[headers[columns.mobile_phone]];
        trainer.picture = row[headers[columns.picture]];
        trainer.monCv = row[headers[columns.monCv]];
        trainer.matieres = row[headers[columns.matieres]];
        trainer.siret = row[headers[columns.siret]];


        for (titreCv of destCV) {

            /* ---- Récuperer la liste de Cv.pdf ---- */
            trainer.nomCv = row[titreCv[columns.nomCv]];
        }

        for(poc of pocs) {

            /* ---- Recuperer la liste de photo-profile ---- */
            trainer.picture = row[blobpics[columns.picture]];
        }

        // sauvegarder chaque Trainers dans la bdd
        await trainer.save();

        console.log(trainer.toJSON());

    }

    return rows;
};