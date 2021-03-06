const XlsxExtractor = require('../utils/xlsxExtravtor');
const FinderCV = require('../utils/finderCv');
const FinderPics = require('../utils/finderPics');
const fs = require('fs');
const request = require('request');
const stream = require('stream');
const dl = require('../downloader');

/* -------------------------------------------------- */
/* -------------------------------------------------- */
/* -----------Extrait creer User Bronze ------------- */
/* -------------------------------------------------- */
/* -------------------------------------------------- */
/* - -Parcour le fichier Excel: 'BBD Bronze.Xlsx' --- */
/* - -Extrait les informations ligne par ligne    --- */
/* - -Copies les Images de profile utilisateur    --- */
/* - -Copies les Cv de chaque profile utilisateur --- */
/* - -Sauvegarde les données dans la Table: 'User'--- */
/* -------------------------------------------------- */


/*----- Initialise le tableau de champs de données ---*/
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

    /* ---- script d'extraction de données  ---- */
    const {headers, rows} = XlsxExtractor("./BDD Bronze insert.xlsx");

    /* --- injitialise les repertoires de recherche --- */
    let pathFilePicture = 'BBD Bronze/BBD Bronze/Photos';
    let pathFileCV = 'BBD Bronze/BBD Bronze/CV';

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


        // Recherche par Nom de fichier
        if (user.picture && user.picture != "") {

            // Construit le Nom de l'image Utilisateur
            let filename = [user.first_name] + [user.last_name];

            // Parcours le répertoire source d'images
            let src = path.join(pathFilePicture, user.picture);

            // Construit le nom du repertoire destinataire
            let destDir = path.join(__dirname, '/client/' + filename);
            fs.access(destDir, (err) => {
                if (err)
                    fs.mkdirSync(destDir);
                copyFile(src, path.join(destDir, filename));
            });

            // Copie l'image dans le répertoire destinataire
            function copyFile(src, dest) {

                let readStream = fs.createReadStream(src);

                readStream.once('error', (err) => {
                    console.log(err);
                });

                readStream.once('end', () => {
                    console.log('copy éffectuer le client: ' + filename);
                    console.log("Src : ", src)
                    console.log("Dest : ", dest)
                });

                readStream.pipe(fs.createWriteStream(dest));
            }
        }
        else {
            console.log("Erreur pas de photo-profile pour: ", filename)
        }


        // Recherche par Nom de fichier
        if (user.nomCv && user.nomCv != "") {

            // Construit le Nom du CV de l'Utilisateur
            let filename = user.first_name + user.last_name;

            // Parcours le répertoire source de CV
            let src = path.join(pathFileCV, user.nomCv);

            // Construit le nom du repertoire destinataire
            let destDir = path.join(__dirname, '/client/' + filename);
            fs.access(destDir, (err) => {
                if (err) {
                    console.log(err);
                    fs.mkdirSync(destDir);
                }
                copyFile(src, path.join(destDir, filename));
            });

            // Copie l'image dans le répertoire destinataire
            function copyFile(src, dest) {

                let readStream = fs.createReadStream(src);

                readStream.once('error', (err) => {
                    console.log(err);
                });

                readStream.once('end', () => {
                    console.log('copy ok pour :');
                    console.log("Src : ", src);
                    console.log("Dest : ", dest)
                });

                readStream.pipe(fs.createWriteStream(dest));
            }
        }
        else {
            console.log("pas de cv pour : ", filename)
        }


        // sauvegarder chaque User dans la bdd
        await user.save();

        console.log(user.toJSON());

    }

    return rows;
};