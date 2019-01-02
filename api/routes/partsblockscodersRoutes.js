'use strict';
module.exports = function(app) {
  var controller = require('../controllers/partsblockscodersController');

  app.route('/parts')
    .get(controller.list_all_parts)
    .post(controller.create_a_part);


  app.route('/parts/:name')
    .get(controller.read_a_part)
    .put(controller.update_a_part)
    .delete(controller.delete_a_part);

  app.route('/blocks')
    .get(controller.list_all_blocks)
    .post(controller.create_a_block);

  app.route('/blocks/:name')
    .get(controller.read_a_block)
    .put(controller.update_a_block)
    .delete(controller.delete_a_block);

  app.route('/coders')
    .get(controller.list_all_coders)
    .post(controller.create_a_coder);

  app.route('/coders/:name')
    .get(controller.read_a_coder)
    .put(controller.update_a_coder)
    .delete(controller.delete_a_coder);

};
