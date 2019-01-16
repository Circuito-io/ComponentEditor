'use strict';

const path = require('path');
const { exec } = require('child_process');

exports.gitpodopen = function(req, res) {
    exec(`gp open ${path.join(global.dataFolder, req.params.path)}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
};
