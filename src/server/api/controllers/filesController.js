"use strict";

const fs = require("fs");
const path = require("path");
var object = require('lodash/object');

var objFolder = function(objPrefix) {
  return path.join(global.dataFolder, objPrefix);
};

var objFile = function(objPrefix, objName) {
  return path.join(objFolder(objPrefix), objName + ".json");
};

exports.list_all_files_factory = function(objPrefix, fields) {
  return function(req, res) {
    console.log("list_all_files", objPrefix, fields);
    var folder = objFolder(objPrefix);
    var files = fs.readdirSync(folder).map(fn => {
      var basename = path.basename(fn, ".json");
      if (fields) {
        // return defined fields from file

        var data = {};
        try {
          data = JSON.parse(fs.readFileSync(path.join(folder, fn), "utf8"));
        } catch (e) {
          console.log("Can't read", fn, e);
        }

        var res = { name: basename };
        if (data) {
          fields.forEach(field => (res[field] = object.get(data, field)));
        }
        return res;
      } else return basename;
    });

    res.json(files);
  };
};

exports.read_a_file_factory = function(objPrefix) {
  return function(req, res) {
    console.log("read_a_file", objPrefix, req.params.name);

    global.analytics.track({
      userId: global.userid,
      event: "File Opened",
      properties: {
        type: objPrefix,
        name: req.params.name
      }
    });

    fs.readFile(objFile(objPrefix, req.params.name), "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }

      try {
        var json = JSON.parse(data);
      } catch (err) {
        console.log(err);

        if (err instanceof SyntaxError) {
          return res.status(400).send("Invalid JSON<br>" + data);
        }
        return;
      }

      res.json(json);
    });
  };
};

exports.update_a_file_factory = function(objPrefix) {
  return function(req, res) {
    console.log("Update", objPrefix, req.params.name);

    global.analytics.track({
      userId: global.userid,
      event: "File Updated",
      properties: {
        type: objPrefix,
        name: req.params.name
      }
    });

    try {
      var data = JSON.stringify(req.body, null, 2);
    } catch (err) {
      console.log(err);

      if (err instanceof SyntaxError) {
        res.status(400).send("Invalid JSON<br>" + data);
      }
      return;
    }
    fs.writeFileSync(objFile(objPrefix, req.params.name), data);
    res.send("OK");
  };
};

exports.create_a_file_factory = function(objPrefix) {
  return function(req, res) {
    var name = req.body["name"];

    if (!name) {
      console.log("CREATE request with missing object name");
      res.status(400).send("Missing name in object");
      return;
    }

    console.log("name", name);

    try {
      var data = JSON.stringify(req.body, null, 2);
    } catch (err) {
      console.log(err);

      if (err instanceof SyntaxError) {
        res.status(400).send("Invalid JSON<br>" + data);
      }
      return;
    }
    fs.writeFileSync(objFile(objPrefix, name), data);
  };
};

exports.delete_a_file_factory = function(objPrefix) {
  return function(req, res) {
    fs.unlinkSync(objFile(objPrefix, req.params.name));
  };
};

exports.delete_a_subdir_file_factory = function(objPrefix) {
  return function(req, res) {
    const filepath = path.join(
      objFolder(objPrefix),
      req.params.name,
      req.params.filename
    );
    console.log("DELETE ", filepath);

    fs.unlink(filepath, err => {
      if (err) {
        console.log("DELETE failed");
        res.status(400).send("Can't find file" + err);
      } else {
        res.send("OK");
      }
    });
  };
};

exports.cache_list_all_files_factory = function(objPrefix) {
  return function() {
    var files = fs
      .readdirSync(objFolder(objPrefix))
      .map(fn => path.basename(fn, ".json"));
    return files;
  };
};
