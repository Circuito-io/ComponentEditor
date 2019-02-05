"use strict";

const rp = require("request-promise");
const urlJoin = require("proper-url-join");

exports.svgdata = function(req, res) {
  const endPoint = urlJoin(
    global.svgdataServer,
    "svgdata",
    "?img=" + req.params.img
  );
  console.log("svgdata", req.params.img);

  // proxy request to api and return the result
  rp({
    url: endPoint,
    json: true
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ message: err.message });
    });
};
