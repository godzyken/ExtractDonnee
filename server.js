var app = require('./app');
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    console.log('Express server en lecture du port ' + port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});
