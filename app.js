const Sequelize = require('sequelize');
const Glob = require('glob').Glob;
const fs = require('fs-extra');

/*const sequelize = new Sequelize('tutosme.dev', 'tutosme.dev', 'HNmB1g1KWEODsI2u', {
    host: 'appsvelocity.cabutdpbsmsc.eu-west-3.rds.amazonaws.com',
    dialect: 'mysql'
});*/

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


const Models = {};

(async () => {
    await sequelize.authenticate();

    // glob.sync("./models/*.js").forEach(file => {
    //
    //    require(file)(sequelize, Models);
    // });
    var glob = new Glob("./models/*js", sequelize, Models);

    var files = glob.sync(glob);
    if (Models) {
        files = files.map(function (file) {
            return file.replace(Models, '');
        });
    }
    output = _.union(output, files);

    let client = await require("./bronze")(Models);
    let formateur = await require("./gold")(Models);

    await fs.outputFile("./bronze/data.json", JSON.stringify(client, null, 4), "utf8");
    await fs.outputFile("./gold/data.json", JSON.stringify(formateur, null, 4), "utf8");


    console.log("END");
})().catch(err => {
    console.error(err);
});