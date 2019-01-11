var express = require('express');
var app = express();
var cors = require('cors');



app.use(cors());

var BronzeController = require('./bronze/BronzeController');
app.use('/bronzes', BronzeController);

var GoldController = require('./gold/GoldController');
app.use('/golds', GoldController);

module.exports = app;