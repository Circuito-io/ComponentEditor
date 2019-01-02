'use strict';

const rp = require('request-promise');
const fs = require('fs');
const path = require('path');
const urlJoin = require("proper-url-join");

const walkDirSync = (d, res = { Parts: [], Coders: [], Blocks: [], CodeFiles: [] }, type = null) => {
	if (fs.statSync(d).isDirectory()) {
		if (type == null) {
			if (d.includes('/Parts')) {
				type = 'Parts';
			}
			else if (d.includes('/Coders')) {
				type = 'Coders';
			}
			else if (d.includes('/Blocks')) {
				type = 'Blocks';
			}
		}

		return fs.readdirSync(d).reduce((res, f) => walkDirSync(path.join(d, f), res, type), res);
	}
	else {
		let data = fs.readFileSync(d, 'utf8');
		if (d.includes('.json')) {
			data = JSON.parse(data);
			res[type].push(data);
		}
		else {
			let path = d.split('\\').pop().split('/');
			let filename = path.pop();
			let curDir = path.pop();
			// It's a code file belonging to a coder
			res['CodeFiles'].push({
				name: filename,
				coder: curDir,
				content: encodeURIComponent(data)
			});
		}
	}

	return res;
}

exports.upload = function(req, res) {

	var files = walkDirSync(global.dataFolder);
	const endPoint = urlJoin(global.circuitoServer, global.uploadEndpoint, global.userid, { trailingSlash: true });

	console.log("Sending to", endPoint)

	rp({
			url: endPoint,
			method: 'post',
			body: files,
			json: true,
		})
		.then(body => {
			res.send('OK');
		})
		.catch(err => {
			console.log(err)
			res.status(404).send(err.message);
		})
};
