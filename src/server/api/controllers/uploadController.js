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

function setDifference(setA, setB) {
  var _difference = new Set(setA);
  for (var elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

const isSetsEqual = (a, b) =>
  a.size === b.size && [...a].every(value => b.has(value));

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
    // case directory
    if (depth == 1) {
      if (["Parts", "Coders", "Blocks"].includes(basename)) type = basename;
      else console.error("Ignoring unkonwn folder", basename);
    }

    // recursivly process all files in dir
    return fs
      .readdirSync(d)
      .sort(
        (a, b) =>
          fs.statSync(path.join(d, b)).isDirectory() -
          fs.statSync(path.join(d, a)).isDirectory()
      ) // sort dirs first
      .reduce(
        (res, f) => walkDirSync(path.join(d, f), res, type, depth + 1),
        res
      );
  } else {
    // case file
    let dataraw = fs.readFileSync(d, "utf8");
    if (depth == 2 && ext == ".json") {
      // case json data file

      var data = JSON.parse(dataraw);
      data.path=`${type}/${basename}`; // add file path to data

      if (type == "Coders" && data.name) {
        // for coder, find files under the relevant folder and compare to files field
        // assumes codefiles for relevant coder were already processes
        var actualFiles = new Set(
          res["CodeFiles"]
            .filter(file => file.coder === data.name)
            .map(file => file.name)
        );
        var listedFiles = new Set(data.files);

        if (!isSetsEqual(actualFiles, listedFiles)) {
          var missingFiles = setDifference(listedFiles, actualFiles);
          var extraFiles = setDifference(actualFiles, listedFiles);
          console.log(
            data.name,
            "Coder files field differs from files in coder folder.\n\tOmitting missing files:",
            [...missingFiles].join(",") || "none",
            "\n\tAdding unlisted files from folder:",
            [...extraFiles].join(",") || "none",
            "\n\tUpdating coder..."
          );

          //update field to actual files
          data.files = [...actualFiles].sort();

          // update original data file
          dataraw = JSON.stringify(data, null, 2);
          fs.writeFileSync(d, dataraw);
          console.log("\tSaved");
        }
      }
      // keep the (modified) data
      res[type].push(data);
    } else if (type == "Coders" && depth == 3) {
      // case coder file
      res["CodeFiles"].push({
        name: basename,
        coder: enddirname,
        content: encodeURIComponent(dataraw)
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
