'use strict';

const fs = require('fs');
const path = require('path');
const filesController = require('./filesController');

const partsSubFolder  =  'Parts';
const blocksSubFolder = 'Blocks';

exports.list_all_parts = filesController.list_all_files_factory(partsSubFolder);
exports.create_a_part = filesController.create_a_file_factory(partsSubFolder);
exports.read_a_part = filesController.read_a_file_factory(partsSubFolder);
exports.update_a_part = filesController.update_a_file_factory(partsSubFolder);
exports.delete_a_part = filesController.delete_a_file_factory(partsSubFolder);

exports.list_all_blocks = filesController.list_all_files_factory(blocksSubFolder);
exports.create_a_block = filesController.create_a_file_factory(blocksSubFolder);
exports.read_a_block = filesController.read_a_file_factory(blocksSubFolder);
exports.update_a_block = filesController.update_a_file_factory(blocksSubFolder);
exports.delete_a_block = filesController.delete_a_file_factory(blocksSubFolder);
