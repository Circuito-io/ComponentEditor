"use strict";

const urlJoin = require("proper-url-join");

exports.preview = function(req, res) {
  const endPoint = urlJoin(
    global.circuitoServer,
    global.previewEndpoint + global.userid
  );
  res.json({ userid: global.userid, endPoint: endPoint });
};
