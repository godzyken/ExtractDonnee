var express = require('express');
var app = express();
const cors = require('cors');

var corpsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200
};

app.use(cors(corpsOptions));

var BronzeController = require('./bronze/BronzeController');
app.use('/bronzes', BronzeController);

var GoldController = require('./gold/GoldController');
app.use('/golds', GoldController);

module.exports = app;