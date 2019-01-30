"use strict";

const rp = require("request-promise");
const fs = require("fs");
const path = require("path");
const urlJoin = require("proper-url-join");
const Validator = require("jsonschema").Validator;

var partSchema = require("../../../../circuito-schema/part.json");
var blockSchema = require("../../../../circuito-schema/block.json");
var coderSchema = require("../../../../circuito-schema/coder.json");

var schema = { type: "number" };

const walkDirSync = (
  d,
  res = { Parts: [], Coders: [], Blocks: [], CodeFiles: [] },
  type = null,
  depth = 0
) => {
  var dpath = path.parse(d);
  var basename = dpath.base;
  var dirname = dpath.dir;
  var enddirname = dirname.split(path.sep).pop();
  var ext = dpath.ext;

  if (fs.statSync(d).isDirectory()) {
    // directory
    if (depth == 1) {
      if (["Parts", "Coders", "Blocks"].includes(basename)) type = basename;
      else console.error("Ignoring unkonwn folder", basename);
    }

    return fs
      .readdirSync(d)
      .reduce(
        (res, f) => walkDirSync(path.join(d, f), res, type, depth + 1),
        res
      );
  } else {
    // file
    let data = fs.readFileSync(d, "utf8");
    if (depth == 2 && ext == ".json") {
      // json data file
      data = JSON.parse(data);
      res[type].push(data);
    } else if (type == "Coders" && depth == 3) {
      // coder file
      res["CodeFiles"].push({
        name: basename,
        coder: enddirname,
        content: encodeURIComponent(data)
      });
    } else {
      console.error("Ignoring file", d);
    }
  }

  return res;
};

exports.upload = function(req, res) {
  var files = walkDirSync(global.dataFolder);

  var validator = new Validator();
  var errorString = "";

  const schemaSets = [
	{ type: "Blocks", schema: blockSchema },
    { type: "Parts", schema: partSchema },
    { type: "Coders", schema: coderSchema }
  ];

  schemaSets.map(schemaSet => {
    files[schemaSet.type].map(obj => {
      var validation = validator.validate(obj, schemaSet.schema);
      if (validation.errors.length > 0) {
        errorString += `<h4>${schemaSet.type} ${
          obj.name
        }</h4>\n</br><ul>${validation.errors
          .map(error => `<li>${error}</li>`)
          .join("\n")}</ul> \n\n</br></br>`;
      }
    });
  });

  if (errorString) {
    global.analytics.track({
      userId: global.userid,
      event: "Schema Failed"
    });

    console.log("Found schema errors, aborting");
    console.log("Found schema errors, aborting");
    res.status(412).send(errorString);
    return;
  }

  const endPoint = urlJoin(
    global.circuitoServer,
    global.uploadEndpoint,
    global.userid,
    { trailingSlash: true }
  );

  console.log("Sending to", endPoint);

  global.analytics.track({
    userId: global.userid,
    event: "Data Uploaded"
  });

  rp({
    url: endPoint,
    method: "post",
    body: files,
    json: true
  })
    .then(body => {
      console.log("Upload OK");
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send(err.message);
    });
};
