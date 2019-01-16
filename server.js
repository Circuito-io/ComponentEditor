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

app.set('views', __dirname + '/src/server/views');
app.set('view engine', 'pug'); // We use pug as our templating engine

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))


var partsBlocksCodersController = require('./api/controllers/partsblockscodersController');
var partsBlocksCodersRoutes = require('./api/routes/partsblockscodersRoutes');
var previewRoutes = require('./api/routes/previewRoutes');
var uploadRoutes = require('./api/routes/uploadRoutes');
var svgdataRoutes = require('./api/routes/svgdataRoutes');
partsBlocksCodersRoutes(app);
previewRoutes(app);
uploadRoutes(app);
svgdataRoutes(app);

app.listen(port, hostname);

app.locals.listCache = {};
app.locals.listCache.Blocks = partsBlocksCodersController.cache_list_all_blocks();

app.get('/', function (req, res)
{
    res.render('plain.html');
});

app.get('/:block', function (req, res)
{
	if (app.locals.listCache['Blocks'].includes(req.params.block)) {
    	res.render('index');
	}
	else {
		res.render('404');
	}

});

console.log('miniMESS RESTful API server started on: ' + hostname + '/' + port);
