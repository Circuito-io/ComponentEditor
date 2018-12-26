global.dataFolder = __dirname + '/components';
global.circuitoServer = "***REMOVED***
global.uploadEndpoint = "save_components";
global.previewEndpoint = "app?u=";

// Generate unique user uuid
const uuidv4 = require('uuid/v4');
global.userid = uuidv4();

var express = require('express');
var app = express();
var port = 8080;
var hostname = "0.0.0.0";
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

var partsRoutes = require('./api/routes/partsblocksRoutes');
var previewRoutes = require('./api/routes/previewRoutes');
var uploadRoutes = require('./api/routes/uploadRoutes');
partsRoutes(app);
previewRoutes(app);
uploadRoutes(app);

app.listen(port, hostname);

console.log('miniMESS RESTful API server started on: ' + hostname + '/' + port);
