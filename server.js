global.dataFolder = __dirname + '/components';
global.previewServer = "http://localhost:3000/save_components/main";

var express = require('express');
var app = express();
var port = 8080;
var hostname = "0.0.0.0";
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

var partsRoutes = require('./api/routes/partsRoutes');
var previewRoutes = require('./api/routes/previewRoutes');
partsRoutes(app);
previewRoutes(app);

app.listen(port, hostname);

console.log('miniMESS RESTful API server started on: ' + hostname + '/' + port);
