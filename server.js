const path = require('path');

global.dataFolder = path.join(__dirname , 'components');
global.circuitoServer = "https://circuito-ci-staging-pr-319.herokuapp.com/";
global.uploadEndpoint = "save_components";
global.previewEndpoint = "app?u=";
global.svgdataServer = "https://gz1f13eb3m.execute-api.us-west-1.amazonaws.com/Prod/";

// Generate unique user uuid
const uuidv4 = require('uuid/v4');
global.userid = uuidv4();

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var hostname = "0.0.0.0";
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

var partsBlocksCodersRoutes = require('./api/routes/partsblockscodersRoutes');
var previewRoutes = require('./api/routes/previewRoutes');
var uploadRoutes = require('./api/routes/uploadRoutes');
var svgdataRoutes = require('./api/routes/svgdataRoutes');
partsBlocksCodersRoutes(app);
previewRoutes(app);
uploadRoutes(app);
svgdataRoutes(app);

app.listen(port, hostname);

console.log('miniMESS RESTful API server started on: ' + hostname + '/' + port);
