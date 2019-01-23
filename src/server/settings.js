const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

global.dataFolder = path.join(__dirname, '../../components');
global.circuitoServer = "http://localhost:3000/";
global.uploadEndpoint = "save_components";
global.previewEndpoint = "app?u=";
global.svgdataServer = "https://gz1f13eb3m.execute-api.us-west-1.amazonaws.com/Prod/";
global.segmentWriteKey = "v7Pr4l9fyYqO9kng77jp4UF1KzDNW7TN";

const useridFilename = path.join(__dirname, '../../userid.json');
try {
    var data = fs.readFileSync(useridFilename);
    var dataparsed = JSON.parse(data);
    global.userid = dataparsed.userid;
} catch (err) {
    console.log("Error while trying to load userid");
}

if (global.userid == undefined) {
    global.userid = uuidv4();
    console.log("Generated userid", global.userid);

    // save for next run
    fs.writeFileSync(useridFilename, JSON.stringify({
        userid: global.userid
    }));
} else {
    console.log("Found userid", global.userid);
}

var Analytics = require('analytics-node');
global.analytics = new Analytics(global.segmentWriteKey);
