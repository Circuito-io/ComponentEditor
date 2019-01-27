"use strict";

const fs = require("fs");
const path = require("path");
const filesController = require("./filesController");

const partsSubFolder = "Parts";
const blocksSubFolder = "Blocks";
const codersSubFolder = "Coders";

exports.list_all_parts = filesController.list_all_files_factory(partsSubFolder);
exports.create_a_part = filesController.create_a_file_factory(partsSubFolder);
exports.read_a_part = filesController.read_a_file_factory(partsSubFolder);
exports.update_a_part = filesController.update_a_file_factory(partsSubFolder);
exports.delete_a_part = filesController.delete_a_file_factory(partsSubFolder);

exports.list_all_blocks = filesController.list_all_files_factory(
  blocksSubFolder
);
exports.create_a_block = filesController.create_a_file_factory(blocksSubFolder);
exports.read_a_block = filesController.read_a_file_factory(blocksSubFolder);
exports.update_a_block = filesController.update_a_file_factory(blocksSubFolder);
exports.delete_a_block = filesController.delete_a_file_factory(blocksSubFolder);

exports.list_all_coders = filesController.list_all_files_factory(
  codersSubFolder
);
exports.create_a_coder = filesController.create_a_file_factory(codersSubFolder);
exports.read_a_coder = filesController.read_a_file_factory(codersSubFolder);
exports.update_a_coder = filesController.update_a_file_factory(codersSubFolder);
exports.delete_a_coder = filesController.delete_a_file_factory(codersSubFolder);

exports.delete_a_coder_file = filesController.delete_a_subdir_file_factory(
  codersSubFolder
);

exports.upload_a_coder_file = function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  var file = req.files.file;
  var targetPath = path.join(global.dataFolder, codersSubFolder, req.params.name, file.name);

  file.mv(targetPath, function(err) {
    if (err) {
      console.log("Upload failed", targetPath, err);
      return res.status(500).send(err);
    }

    console.log("File received", targetPath);
    res.send("OK");
  });
};

// Server use only
exports.cache_list_all_parts = filesController.cache_list_all_files_factory(
  partsSubFolder
);
exports.cache_list_all_blocks = filesController.cache_list_all_files_factory(
  blocksSubFolder
);
exports.cache_list_all_coders = filesController.cache_list_all_files_factory(
  codersSubFolder
);
