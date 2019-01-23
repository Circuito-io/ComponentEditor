'use strict';

const urlJoin = require("proper-url-join");

exports.preview = function(req, res) {
    global.analytics.track({
        userId: global.userid,
        event: 'Preview Opened'
    });

    const endPoint = urlJoin(global.circuitoServer, global.previewEndpoint+global.userid);
    console.log(endPoint);
    res.send(endPoint);
};
