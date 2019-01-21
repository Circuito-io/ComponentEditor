const path = require('path');

global.dataFolder = path.join(__dirname , '../../components');
global.circuitoServer = "https://circuito-ci-staging-pr-319.herokuapp.com/";
global.uploadEndpoint = "save_components";
global.previewEndpoint = "app?u=";
global.svgdataServer = "https://gz1f13eb3m.execute-api.us-west-1.amazonaws.com/Prod/";