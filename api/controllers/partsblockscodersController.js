'use strict';

const fs = require('fs');
const path = require('path');
const filesController = require('./filesController');

const partsSubFolder  =  'Parts';
const blocksSubFolder = 'Blocks';
const codersSubFolder = 'Coders';

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

exports.list_all_coders = filesController.list_all_files_factory(codersSubFolder);
exports.create_a_coder = filesController.create_a_file_factory(codersSubFolder);
exports.read_a_coder = filesController.read_a_file_factory(codersSubFolder);
exports.update_a_coder = filesController.update_a_file_factory(codersSubFolder);
exports.delete_a_coder = filesController.delete_a_file_factory(codersSubFolder);

// Server use only
exports.cache_list_all_parts = filesController.cache_list_all_files_factory(partsSubFolder);
exports.cache_list_all_blocks = filesController.cache_list_all_files_factory(blocksSubFolder);
exports.cache_list_all_coders = filesController.cache_list_all_files_factory(codersSubFolder);
