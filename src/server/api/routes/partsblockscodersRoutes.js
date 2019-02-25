<<<<<<< HEAD
'use strict';
module.exports = function(app) {
  var controller = require('../controllers/partsblockscodersController');

  app.route('/api/parts')
    .get(controller.list_all_parts)
    .post(controller.create_a_part);


  app.route('/api/parts/:name')
=======
"use strict";
module.exports = function(app) {
  var controller = require("../controllers/partsblockscodersController");

  app
    .route("/api/parts")
    .get(controller.list_all_parts)
    .post(controller.create_a_part);

  app
    .route("/api/parts/:name")
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91
    .get(controller.read_a_part)
    .put(controller.update_a_part)
    .delete(controller.delete_a_part);

<<<<<<< HEAD
  app.route('/api/blocks')
    .get(controller.list_all_blocks)
    .post(controller.create_a_block);

  app.route('/api/blocks/:name')
=======
  app
    .route("/api/blocks")
    .get(controller.list_all_blocks)
    .post(controller.create_a_block);

  app
    .route("/api/blocks/:name")
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91
    .get(controller.read_a_block)
    .put(controller.update_a_block)
    .delete(controller.delete_a_block);

<<<<<<< HEAD
  app.route('/api/coders')
    .get(controller.list_all_coders)
    .post(controller.create_a_coder);

  app.route('/api/coders/:name')
=======
  app
    .route("/api/coders")
    .get(controller.list_all_coders)
    .post(controller.create_a_coder);

  app
    .route("/api/coders/:name")
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91
    .get(controller.read_a_coder)
    .put(controller.update_a_coder)
    .delete(controller.delete_a_coder);

<<<<<<< HEAD
=======
  app
    .route("/api/coders/:name/:filename")
    .delete(controller.delete_a_coder_file);

  app.route("/api/coders-file/:name").post(controller.upload_a_coder_file);
>>>>>>> cc7dd090a1952c1bd1884df39b0bbfc1a5e76a91
};
