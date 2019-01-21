const fs = require('fs');
const path = require('path');
const urlJoin = require("proper-url-join");
require('./settings.js');

const walkDirSync = (d, res = { Parts: [], Coders: [], Blocks: [], CodeFiles: [] }, type = null, depth = 0) => {
	var dpath      = path.parse(d)
	var basename   = dpath.base;
	var dirname    = dpath.dir;
	var enddirname = dirname.split(path.sep).pop();
	var ext        = dpath.ext;

	if (fs.statSync(d).isDirectory()) {
		return fs.readdirSync(d).reduce((res, f) => walkDirSync(path.join(d, f), res, type, depth + 1), res);
	}
	else {
		// file
		let data = fs.readFileSync(d, 'utf8');
		if (depth == 2 && ext == '.json') {
            // json data file
            data = JSON.parse(data);
            fs.writeFileSync(d, JSON.stringify(data, null, 2));
            console.log("Writing", d);
		}
		else {
			console.error("Ignoring file", d);
		}
	}

	return res;
}

walkDirSync(global.dataFolder)