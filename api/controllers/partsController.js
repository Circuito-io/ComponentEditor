'use strict';

const fs = require('fs');
const path = require('path');
const filesController = require('./filesController');

const partsSubFolder  =  'Parts';

exports.list_all_parts = filesController.list_all_files_factory(partsSubFolder);


exports.create_a_part = filesController.create_a_file_factory(partsSubFolder);


exports.read_a_part = filesController.read_a_file_factory(partsSubFolder);


exports.update_a_part = filesController.update_a_file_factory(partsSubFolder);


exports.delete_a_part = filesController.delete_a_file_factory(partsSubFolder);
