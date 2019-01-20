const fs = require('fs');
const user = require('../models/user');

let picture;


module.exports = (filePath)=>{
    const headers = [];
    const pics = [];

    const finderPics = new fs.readdirSync(filePath).forEach(file =>{
        if (picture === !user.picture) {
            throw new Error('Vous n\'avez pas fournie de photo-profile');
        }
        else {
            return {
                headers: headers,
                rows:  pics
            };
        }
    });

    console.log('ok' + pics);
};