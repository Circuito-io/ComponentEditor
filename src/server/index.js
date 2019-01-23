require('./settings.js');
const path = require('path');

global.analytics.identify({
	userId: global.userid
});
global.analytics.track({
	userId: global.userid,
	event: 'Server Started',
});

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var hostname = "0.0.0.0";
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // We use pug as our templating engine

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static('dist'))


var partsBlocksCodersController = require('./api/controllers/partsblockscodersController');
var partsBlocksCodersRoutes = require('./api/routes/partsblockscodersRoutes');
var previewRoutes = require('./api/routes/previewRoutes');
var uploadRoutes = require('./api/routes/uploadRoutes');
var svgdataRoutes = require('./api/routes/svgdataRoutes');
var gitpodRoutes = require('./api/routes/gitpodRoutes');
partsBlocksCodersRoutes(app);
previewRoutes(app);
uploadRoutes(app);
svgdataRoutes(app);
gitpodRoutes(app);

app.listen(port, hostname);

app.locals.listCache = {};
app.locals.listCache.Blocks = partsBlocksCodersController.cache_list_all_blocks();

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/:block', function (req, res) {
	if (app.locals.listCache['Blocks'].includes(req.params.block)) {
		res.render('index');
	} else {
		res.render('404');
	}

});

var reload = require('reload', {verbose: true});
reload(app);

console.log('Data folder:', global.dataFolder);
console.log('miniMESS RESTful API server started on: ' + hostname + '/' + port);